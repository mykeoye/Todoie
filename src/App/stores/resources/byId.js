import omit from 'lodash/omit'
import { createSelector } from 'reselect'

import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import uniq from 'lodash/uniq'

import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = {}

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_ENTITIES]: (state, {payload: { entities }}) => {
    if (isEmpty(entities[type])) {
      return state
    }

    return {...state, ...entities[type]}
  },

  [t.REMOVE_ENTITIES]: (state, {payload: entities, meta}) => {
    if (type !== meta.type) {
      return state
    }

    if (typeof entities === 'undefined' || isEmpty(entities)) {
      return defaultState
    }

    let entitiesId = entities.map(entity => entity.id)
    return omit(state, entitiesId)
  },

  [t.SET_ENTITY]: (state, {
    payload: { entities, result },
    meta: { type: rtype, parentType, parentId }
  }) => {
    // 'result' can be a child looking for his parent,
    // so start checking for that
    if (!isNil(parentType) && parentType === type && !isNil(parentId)) {
      const parent = {...state[parentId]}
      const child = Array.isArray(result) ? result : [result]
      parent[rtype] = parent[rtype] ? parent[rtype] : []
      parent[rtype] = uniq([...parent[rtype], ...child])

      return {
        ...state,
        [parentId]: parent
      }
    }

    if (type !== rtype && (typeof entities[type] === 'undefined' || isEmpty(entities[type]))) {
      return state
    }

    let newState = {...state}
    Object.keys(entities[type]).forEach(entityId => {
      const entity = entities[type][entityId]
      newState[entity.id] = Object.assign({}, state[entity.id], entity)
    })

    return newState
  },

  [t.REMOVE_ENTITY]: (state, {
    payload: entityId,
    meta: { type: rtype, parentType, parentId }
  }) => {
    // 'result' can be a child looking for his parent,
    // so start checking for that
    if (!isNil(parentType) && parentType === type && !isNil(parentId)) {
      const parent = {...state[parentId]}

      if (parent[rtype] && parent[rtype][0]) {
        parent[rtype] = parent[rtype].filter(childId => childId !== entityId)
      }

      return {
        ...state,
        [parentId]: parent
      }
    }

    if (type !== rtype) {
      return state
    }

    const newState = omit(state, entityId)
    return newState
  },

  [t.RESET_RESOURCE]: (state, {payload: entities, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return defaultState
  }
})

export const getEntity = createSelector((state, id) => state[id], entity => entity)

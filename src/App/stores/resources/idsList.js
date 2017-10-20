import uniq from 'lodash/uniq'
import includes from 'lodash/includes'
import isPlainObject from 'lodash/isPlainObject'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'

import { createSelector } from 'reselect'

import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = []

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_ENTITIES]: (state, {
    payload: { entities, result },
    meta: { type: rtype }
  }) => {
    if (!isNil(result)) {
      if (isPlainObject(result)) {
        // If result is a object, it probably has keys of the types of
        // entities given by response with array of ids as value, so we
        // check if result has entities for this reducer resource type.
        let entitiesType = Object.keys(result).find(enType => enType === type)

        if (isNil(entitiesType) || !result[entitiesType][0]) {
          return state
        }

        let entities = result[entitiesType]
        return uniq([...state, ...entities])
      }

      if (type === rtype) {
        if (Array.isArray(result)) {
          // If it is an array, it probably is an array of entities for this
          // resource type (meta.type passed above) equal to this reducer
          // resource type (make sure to dispatch SET_ENTITIES accordingly)
          return uniq([...state, ...result])
        }

        if (!isNaN(result)) {
          // If it is neither an array nor a object, it probably is just one
          // single ID which was fetched from API when expected an collection,
          // (the case where collection has one item only) so push it to state
          return uniq([...state, result])
        }
      }
    }

    // result may be undefined, who knows? check for entities keys
    // first, as meta.type doesn't matter in this case
    if (!isNil(entities) && !isEmpty(entities)) {
      let entitiesType = Object.keys(entities).find(enType => enType === type)

      if (!isNil(entitiesType) && Object.keys(entities[entitiesType])[0]) {
        let entitiesIds = Object.keys(entities[entitiesType])
        return uniq([...state, ...entitiesIds])
      }
    }

    return state
  },

  [t.REMOVE_ENTITIES]: (state, {payload: entities, meta}) => {
    if (meta.type !== type) {
      return state
    }

    if (typeof entities === 'undefined' || isEmpty(entities)) {
      return defaultState
    }

    let oldEntities

    if (Array.isArray(entities) && type === meta.type) {
      oldEntities = entities
    } else {
    // If entities received is not an array, it is probably
    // an object with types as keys and arrays of entities
    // as values. Get the entities for this resource type.
      const etype = Object.keys(entities).find(etype => etype === type)
      if (etype) {
        oldEntities = entities[etype]
      }
    }

    if (oldEntities && oldEntities[0]) {
      let newState = [...state]

      const oldEntitiesIds = oldEntities.map(entity => entity.id)

      newState = newState.filter(id => !includes(oldEntitiesIds, id))

      return uniq(newState)
    }

    return state
  },

  [t.SET_ENTITY]: (state, {payload: { result }, meta}) => {
    if (type !== meta.type || !result || !result[0]) {
      return state
    }

    let entityId = result
    if (Array.isArray(result)) {
      entityId = result[0]
    }

    return uniq([entityId, ...state])
  },

  [t.REMOVE_ENTITY]: (state, {payload: entityId, meta}) => {
    if (type !== meta.type) {
      return state
    }

    let newState = [...state]
    newState = newState.filter(id => id !== entityId)
    return uniq(newState)
  },

  [t.RESET_RESOURCE]: (state, {payload: entities, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return defaultState
  }
})

export const getIds = createSelector(state => state, ids => ids)

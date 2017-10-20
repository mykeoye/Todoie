// idsList is actually a function which returns a reducer
// It is used by 'stores/resources', which is a combination of
// some generic reducers that can be used with any entity

import makeIdsListReducer, { defaultState, getIds } from '../idsList'

const type = 'models'
const reducer = makeIdsListReducer(type)

import * as actions from '../actions'
import * as types from '../actions/constants'

describe('idsList reducer', () => {
  it('should initialize default state', () => {
    const actual = reducer(undefined, {})
    const expected = defaultState

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITIES action with "result" object as payload', () => {
    const entity = {id: 123}
    const result = {[type]: [entity.id]}
    const action = actions.setEntities({ result }, {type})

    const actual = reducer(undefined, action)
    const expected = [entity.id]

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITIES action with "result" array as payload', () => {
    const entity = {id: 123}
    const result = [entity.id]
    const action = actions.setEntities({ result }, {type})

    const actual = reducer(undefined, action)
    const expected = [entity.id]

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITIES action with "result" number as payload', () => {
    const entity = {id: 123}
    const result = entity.id
    const action = actions.setEntities({ result }, {type})

    const actual = reducer(undefined, action)
    const expected = [entity.id]

    expect(actual).toEqual(expected)
  })

  it('should handle REMOVE_ENTITIES action with "entities" array as payload', () => {
    const entity = {id: 123}
    const entities = [entity]
    const action = actions.removeEntities(entities, {type})

    const state = [entity.id]

    const actual = reducer(state, action)
    const expected = []

    expect(actual).toEqual(expected)
  })

  it('should handle REMOVE_ENTITIES action with "entities" object as payload', () => {
    const entity = {id: 123}
    const entities = {[type]: [entity]}
    const action = actions.removeEntities(entities, {type})

    const state = [entity.id]

    const actual = reducer(state, action)
    const expected = []

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITY action', () => {
    const entity = {id: 123}
    const result = [entity.id]
    const action = actions.setEntity({ result }, {type})

    const actual = reducer(undefined, action)
    const expected = result

    expect(actual).toEqual(expected)
  })

  it('should handle REMOVE_ENTITY action', () => {
    const entity = {id: 123}
    const action = actions.removeEntity(entity.id, {type})

    const state = [entity.id]

    const actual = reducer(state, action)
    const expected = []

    expect(actual).toEqual(expected)
  })
})


describe('byId reducer when type doesn\'t match', () => {
  const state = [321]

  it('should NOT handle SET_ENTITIES action and return previous state', () => {
    const entity = {id: 123}
    const result = {anotherType: [entity.id]}
    const action = actions.setEntities({ result }, {type})

    const actual = reducer(state, action)
    const expected = state

    expect(actual).toEqual(expected)
  })

  it('should NOT handle REMOVE_ENTITIES action and return previous state', () => {
    const entity = {id: 123}
    const entities = [entity]
    const action = actions.removeEntities(entities, {type: 'anotherType'})

    const actual = reducer(state, action)
    const expected = state

    expect(actual).toEqual(expected)
  })

  it('should NOT handle SET_ENTITY action and return previous state', () => {
    const entity = {id: 123}
    const result = [entity.id]
    const action = actions.setEntity({ result }, {type: 'anotherType'})

    const actual = reducer(state, action)
    const expected = state

    expect(actual).toEqual(expected)
  })

  it('should NOT handle REMOVE_ENTITY action and return previous state', () => {
    const entity = {id: 123}
    const action = actions.removeEntity(entity.id, {type: 'anotherType'})

    const actual = reducer(state, action)
    const expected = state

    expect(actual).toEqual(expected)
  })
})

describe('getIds selector', () => {
  it('should return ids from state', () => {
    const entity = {id: 123}
    const state = [entity.id]

    const actual = getIds(state)
    const expected = [entity.id]

    expect(actual).toEqual(expected)
  })
})

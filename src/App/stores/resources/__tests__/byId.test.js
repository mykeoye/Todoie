// byId is actually a function which returns a reducer
// It is used by 'stores/resources', which is a combination of
// some generic reducers that can be used with any entity

import makeByIdReducer, { defaultState, getEntity } from '../byId'

const type = 'models'
const reducer = makeByIdReducer(type)

import * as actions from '../actions'
import * as types from '../actions/constants'

describe('byId reducer', () => {
  it('should initialize default state', () => {
    const actual = reducer(undefined, {})
    const expected = defaultState

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITIES action', () => {
    const entity = {id: 123}
    const entities = {[type]: {[entity.id]: entity}}
    const action = actions.setEntities({ entities })

    const actual = reducer(undefined, action)
    const expected = entities[type]

    expect(actual).toEqual(expected)
  })

  it('should handle REMOVE_ENTITIES action', () => {
    const entity = {id: 123}
    const entities = [entity]
    const action = actions.removeEntities(entities, {type})

    const state = {[entity.id]: entity}

    const actual = reducer(state, action)
    const expected = {}

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITY action', () => {
    const entity = {id: 123}
    const entities = {[type]: {[entity.id]: entity}}
    const result = [entity.id]
    const action = actions.setEntity({ entities, result }, {type})

    const actual = reducer(undefined, action)
    const expected = entities[type]

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITY action for child entities', () => {
    const childType = 'childModel'
    const childEntity = {id: 321}
    const result = [childEntity.id]
    const parentEntity = {id: 123}
    const parentType = type
    const parentId = parentEntity.id
    const action = actions.setEntity({ result }, {type: childType, parentType, parentId})

    const state = {[parentEntity.id]: parentEntity}

    const actual = reducer(state, action)
    const expected = {[parentEntity.id]: {...parentEntity, [childType]: result}}

    expect(actual).toEqual(expected)
  })

  it('should handle REMOVE_ENTITY action', () => {
    const entity = {id: 123}
    const action = actions.removeEntity(entity.id, {type})

    const state = {[entity.id]: entity}

    const actual = reducer(state, action)
    const expected = {}

    expect(actual).toEqual(expected)
  })

  it('should handle REMOVE_ENTITY action for child entities', () => {
    const childType = 'childModel'
    const childEntity = {id: 321}
    const parentEntity = {id: 123}
    const parentType = type
    const parentId = parentEntity.id
    const action = actions.removeEntity(childEntity.id, {type: childType, parentType, parentId})

    const state = {[parentEntity.id]: {...parentEntity, [childType]: [childEntity.id]}}

    const actual = reducer(state, action)
    const expected = {[parentEntity.id]: {...parentEntity, [childType]: []}}

    expect(actual).toEqual(expected)
  })
})

describe('byId reducer when type doesn\'t match', () => {
  const state = {321: {id: 321}}

  it('should NOT handle SET_ENTITIES action and return previous state', () => {
    const entity = {id: 123}
    const entities = {anotherType: {[entity.id]: entity}}
    const action = actions.setEntities({ entities })

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
    const entities = {anotherType: {[entity.id]: entity}}
    const result = [entity.id]
    const action = actions.setEntity({ entities, result }, {type: 'anotherType'})

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

describe('getEntity selector', () => {
  it('should return entity by given id if it exists in the state', () => {
    const entity = {id: 123}
    const state = {[entity.id]: entity}

    const actual = getEntity(state, entity.id)
    const expected = entity

    expect(actual).toEqual(expected)
  })
})

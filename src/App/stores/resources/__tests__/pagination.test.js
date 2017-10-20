// pagination is actually a function which returns a reducer
// It is used by 'stores/resources', which is a combination of
// some generic reducers that can be used with any entity

import makePaginationReducer, { defaultState, getCurrentPage, getPagination } from '../pagination'

const type = 'models'
const reducer = makePaginationReducer(type)

import * as actions from '../actions'
import * as types from '../actions/constants'

describe('pagination reducer', () => {
  it('should initialize default state', () => {
    const actual = reducer(undefined, {})
    const expected = defaultState

    expect(actual).toEqual(expected)
  })

  it('should handle SET_ENTITIES action', () => {
    let page = {totalEntities: 12, perPage: 4, current: 1}
    let action = actions.setEntities([], {type, page, term: 'blah'})

    let actual = reducer(undefined, action)
    let expected = {
      ...page,
      totalPages: 3,
      searchTerm: 'blah'
    }

    expect(actual).toEqual(expected)

    page = {totalEntities: 'NaN', perPage: 4, current: 1}
    action = actions.setEntities([], {type, page})

    actual = () => reducer(undefined, action)

    expect(actual).toThrow()
  })

  it('should handle SET_CURRENT_PAGE action', () => {
    let current = 1
    let action = actions.setCurrentPage(current, {type})

    let actual = reducer({}, action)
    let expected = {current}

    expect(actual).toEqual(expected)

    action = actions.setCurrentPage('NaN', {type})
    actual = () => reducer({}, action)

    expect(actual).toThrow()
  })
})

describe('getCurrentPage selector', () => {
  it('should get current page from state ', () => {
    const state = {current: 23}

    let actual = getCurrentPage(state)
    let expected = state.current

    expect(actual).toEqual(expected)
  })
})

describe('getPagination selector', () => {
  it('should get pagination from state ', () => {
    const state = {totalEntities: 12, perPage: 4, current: 1, totalPages: 3}

    let actual = getPagination(state)
    let expected = state

    expect(actual).toEqual(expected)
  })
})

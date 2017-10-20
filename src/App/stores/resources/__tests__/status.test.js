// status is actually a function which returns a reducer
// It is used by 'stores/resources', which is a combination of
// some generic reducers that can be used with any entity

import makeStatusReducer, { defaultState, isLoading, getErrors } from '../status'

const type = 'models'
const reducer = makeStatusReducer(type)

import * as actions from '../actions'
import * as types from '../actions/constants'

describe('status reducer', () => {
  it('should initialize default state', () => {
    const actual = reducer(undefined, {})
    const expected = defaultState

    expect(actual).toEqual(expected)
  })

  it('should handle REQUEST_START action', () => {
    const action = actions.requestStart(true, {type})

    const actual = reducer(undefined, action)
    const expected = {
      loading: true,
      errors: null
    }

    expect(actual).toEqual(expected)
  })

  it('should handle REQUEST_SUCCESS action', () => {
    const action = actions.requestSuccess(true, {type})

    const actual = reducer(undefined, action)
    const expected = {
      loading: false,
      errors: null
    }

    expect(actual).toEqual(expected)
  })

  it('should handle REQUEST_FAILURE action', () => {
    const errors = ['A error']
    const action = actions.requestFailure(errors, {type})

    const actual = reducer(undefined, action)
    const expected = {
      loading: false,
      errors
    }

    expect(actual).toEqual(expected)
  })
})

describe('isLoading selector', () => {
  it('should get loading from state', () => {
    const state = {loading: true}

    const actual = isLoading(state)
    const expected = state.loading

    expect(actual).toEqual(expected)
  })
})

describe('getErrors selector', () => {
  it('should get errors from state', () => {
    const state = {errors: 'A error'}

    const actual = getErrors(state)
    const expected = state.errors

    expect(actual).toEqual(expected)
  })
})

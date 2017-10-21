import makeVisibilityReducer, { defaultState } from '../visibility'

import { setVisibilityFilter } from '../actions'

const type = 'models'
const reducer = makeVisibilityReducer(type)

describe('visibility reducer', () => {
  it('should initialize the default state', () => {
    const actual = reducer(undefined, {})
    const expected =  defaultState

    expect(actual).toEqual(expected)
  })

  it('should return default state if passed unknown filter', () => {
    const action = setVisibilityFilter({filter: 'SHOW_ANY'})

    const actual = reducer(undefined, action)
    const expected = defaultState

    expect(actual).toEqual(expected)
  })
})

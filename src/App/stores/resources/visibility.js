import createReducer from '../utils/createReducer'
import t from './actions/constants'
import filterConstants from './filters'
import { createSelector } from 'reselect'

export const defaultState = {
  filter: filterConstants.SHOW_ALL
}

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_VISIBILITY_FILTER]: (state, { payload: visibility }) => {
    const { filter } = visibility
    return (filterConstants[filter]) ? visibility : state
  }

})

export const getVisibilityFilter = (type) => createSelector(
  state => state,
  state => state[type].visibility.filter,
  (state, filter) => filter
)

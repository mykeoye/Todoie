import createReducer from '../utils/createReducer'
import t from './actions/constants'
import { createSelector } from 'reselect'

export const defaultState = {
  filter: 'SHOW_ALL'
}

export default (type) => createReducer({
  initialState: defaultState,

  [t.SET_VISIBILITY_FILTER]: (state, { payload: filter }) => {
    return filter
  }

})

export const getVisibilityFilter = createSelector(
  state => state.filter
)

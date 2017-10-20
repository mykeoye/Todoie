import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = {
  loading: false,
  errors: null
}

export default (type) => createReducer({
  initialState: defaultState,

  [t.REQUEST_START]: (state, { meta }) => {
    if (type !== meta.type) {
      return state
    }

    return {
      loading: true,
      errors: null
    }
  },

  [t.REQUEST_SUCCESS]: (state, { meta }) => {
    if (type !== meta.type) {
      return state
    }

    return {
      loading: false,
      errors: null
    }
  },

  [t.REQUEST_FAILURE]: (state, {payload: errors, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return {
      loading: false,
      errors
    }
  },

  [t.RESET_RESOURCE]: (state, {payload: entities, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return defaultState
  }
})

export const isLoading = state => state.loading
export const getErrors = state => state.errors

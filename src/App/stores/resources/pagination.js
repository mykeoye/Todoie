import createReducer from '../utils/createReducer'

import t from './actions/constants'

export const defaultState = {
  totalEntities: 0,
  perPage: 0,
  totalPages: 0,
  current: 0,
  searchTerm: ''
}

export default (type) => createReducer({
  initialState: defaultState,

  [t.FETCH_ENTITIES]: (state, { meta }) => {
    if (type !== meta.type || typeof meta.term === 'undefined') {
      return state
    }

    return {
      ...state,
      searchTerm: meta.term
    }
  },

  [t.SET_SEARCH_TERM]: (state, {payload: term, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return {
      ...state,
      searchTerm: term
    }
  },

  [t.SET_ENTITIES]: (state, { meta }) => {
    if (type !== meta.type || typeof meta.page === 'undefined') {
      return state
    }

    const page = validatePage(meta.page)

    page.totalPages = Math.ceil(Math.max(page.totalEntities, page.perPage) / page.perPage)

    return {
      ...page,
      searchTerm: meta.term || ''
    }
  },

  [t.SET_CURRENT_PAGE]: (state, { payload: current, meta }) => {
    if (type !== meta.type) {
      return state
    }

    if (typeof current === 'undefined' || isNaN(current)) {
      throw new Error('"current" from pagination state must be a number')
    }

    return {
      ...state,
      current
    }
  },

  [t.RESET_RESOURCE]: (state, {payload: entities, meta}) => {
    if (type !== meta.type) {
      return state
    }

    return defaultState
  }
})

function validatePage (page) {
  if (typeof page.totalEntities === 'undefined' || isNaN(page.totalEntities)) {
    throw new Error('"meta.page" object must have a "totalEntities" key with a number as value')
  }

  if (typeof page.perPage === 'undefined' || isNaN(page.perPage)) {
    throw new Error('"meta.page" object must have a "perPage" key with a number as value')
  }

  if (typeof page.current === 'undefined' || isNaN(page.current)) {
    throw new Error('"meta.page" object must have a "current" key with a number as value')
  }

  let newPage = {}
  Object.keys(page).forEach(key => {
    newPage[key] = Number(page[key])
  })

  return newPage
}

export const getCurrentPage = state => state.current
export const getPagination = state => state

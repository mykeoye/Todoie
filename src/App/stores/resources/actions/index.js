import { createAction } from 'redux-actions'

export const setEntity = createAction('resources/SET_ENTITY', p => p, (p, m) => m)
export const setEntities = createAction('resources/SET_ENTITIES', p => p, (p, m) => m)

export const removeEntity = createAction('resources/REMOVE_ENTITY', p => p, (p, m) => m)
export const removeEntities = createAction('resources/REMOVE_ENTITIES', p => p, (p, m) => m)

export const fetchEntity = createAction('resources/FETCH_ENTITY', p => p, (p, m) => m)
export const fetchEntities = createAction('resources/FETCH_ENTITIES', p => p, (p, m) => m)

export const submitEntity = createAction('resources/SUBMIT_ENTITY', p => p, (p, m) => m)
export const updateEntity = createAction('resources/UPDATE_ENTITY', p => p, (p, m) => ({...m, method: 'update'}))
export const deleteEntity = createAction('resources/DELETE_ENTITY', p => p, (p, m) => m)

export const requestStart = createAction('resources/REQUEST_START', p => p, (p, m) => m)
export const requestSuccess = createAction('resources/REQUEST_SUCCESS', p => p, (p, m) => m)
export const requestFailure = createAction('resources/REQUEST_FAILURE', p => p, (p, m) => m)

export const setCurrentPage = createAction('resources/SET_CURRENT_PAGE', p => p, (p, m) => m)
export const setSearchTerm = createAction('resources/SET_SEARCH_TERM', p => p, (p, m) => m)

export const resetResource = createAction('resources/RESET_RESOURCE', p => p, (p, m) => m)

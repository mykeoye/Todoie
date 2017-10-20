import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import createLogger from 'redux-logger'
import immutableCheckMiddleWare from 'redux-immutable-state-invariant'

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'

import config from 'config'

import appReducers from 'App/stores'
import appSagas from 'App/stores/sagas'

const middlewares = []
const enhancers = []

const sagaMiddleware = createSagaMiddleware()
// Add thunk and saga middlewares
middlewares.push(sagaMiddleware)

if (config.isDev) {
  // Add immutable check middleware
  middlewares.push(immutableCheckMiddleWare())
}

// Setup redux-storage

// wrap reducer with redux-storage
const wrappedReducer = storage.reducer(appReducers)

// create engine for redux-storage using localstorage
let engine = createEngine('todoapp-state')

// setup and add middleware with engine
const storageMiddleware = storage.createMiddleware(engine)
middlewares.push(storageMiddleware)

// create storage loader
const loadStore = storage.createLoader(engine)

// add logger middleware
const loggerMiddleware = createLogger({
  predicate: () => config.isDev && !config.isServer
})
middlewares.push(loggerMiddleware)

// apply all middlewares to redux enhancer
enhancers.push(applyMiddleware(...middlewares))

export default function configureStore (initialState, callback) {
  // compose store
  const store = compose(...enhancers)(createStore)(wrappedReducer, initialState)

  // load store
  if (typeof callback !== 'undefined') {
    // if there is a callback waiting for the new state, call it
    loadStore(store)
      .then((newState) => callback(null, newState))
      .catch(() => callback('Failed to load previous state', null))
  } else {
    loadStore(store)
  }

  // run app sagas
  sagaMiddleware.run(appSagas)
  store.close = () => store.dispatch(END)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('App/stores', () => {
      const nextRootReducer = require('App/stores/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

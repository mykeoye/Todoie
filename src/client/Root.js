import React from 'react'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import { Provider } from 'react-redux'

import root from 'utils/windowOrGlobal'

import routes from 'config/routes'
import configureStore from 'config/store'

let preloadedState = JSON.parse(root.initialState)

const store = configureStore(preloadedState)

// We need a Root component for React Hot Loading.
function Root () {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  )
}

export default Root

import express from 'express'
import compression from 'compression'
import fs from 'fs'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import RouterContext from 'react-router/lib/RouterContext'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import match from 'react-router/lib/match'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'

import config from 'config'
import routes from 'config/routes'
import configureStore from 'config/store'

import html from './Templates'

const clientAssets = require(KYT.ASSETS_MANIFEST)
const app = express()

// Remove annoying Express header addition.
app.disable('x-powered-by')

// Compress (gzip) assets in production.
app.use(compression())

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)))

// Setup server side routing.
app.get('*', (req, res) => {
  const history = createMemoryHistory(req.originalUrl)
  const store = configureStore({})

  const initialState = serialize(store.getState(), {isJSON: true})

  match({ routes, history, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {
      // When a React Router route is matched then we render
      // the components and assets into the template.
      res.status(200).send(html({
        Root: renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ),
        initialState,
        assets: clientAssets,
        config
      }))
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(parseInt(KYT.SERVER_PORT, 10))

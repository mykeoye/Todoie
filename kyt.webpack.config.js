const path = require('path')
const merge = require('webpack-merge')

// Base modified webpack config for use in development and stage kyt configs
module.exports = (baseConfig, options) => {
  // Add src folder to resolve.
  // This way we can do require('App') instead of require('src/App')
  const config = merge(baseConfig, {
    resolve: {
      modules: [path.resolve(__dirname, 'src')],
      alias: {
        assets: path.join(__dirname, 'src/public')
      }
    },
    // Callback to handle fs error on linux
    node: {
      fs: 'empty'
    }
  })

  // Enable `cheap-eval-source-map` on development for a little bit faster builds.
  // Unfortunately the source map generated aren't really good, so comment this lines
  // if faster builds are not that important to you as source maps are.
  if (options.environment === 'development') {
    config.devtool = 'cheap-eval-source-map'
  }

  // Set webpack-hot-middleware noInfo to true to disable informational console logging
  // and remove reload=true to disable auto-reload of the page when webpack gets stuck
  if (options.type === 'client') {
    let hotEntry = config.entry.main.find(entry => entry.match(/hot-middleware/g))
    if (hotEntry) {
      hotEntry = hotEntry.replace('reload', 'noInfo')
      config.entry.main = config.entry.main.filter(entry => !entry.match(/hot-middleware/g))
      config.entry.main.push(hotEntry)
    }
  }

  // Add babel stage-2 preset
  const babelLoader = baseConfig.module.rules.find(loader => loader.loader === 'babel-loader')
  if (babelLoader && babelLoader.options && babelLoader.options.presets.length) {
    babelLoader.options.presets.push('stage-2')
  }

  return config
}

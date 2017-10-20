const getWebpackConfig = require('./kyt.webpack.config.js')

const port = process.env.PORT || 5000

// Base kyt config for stage.
module.exports = {
  serverURL: 'http://0.0.0.0:' + port,
  debug: false,
  modifyWebpackConfig: (baseConfig, options) => {
    console.log('PORT', port)
    return getWebpackConfig(baseConfig, options)
  }
}

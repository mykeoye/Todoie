// KYT: https://github.com/NYTimes/kyt

const getWebpackConfig = require('./kyt.webpack.config.js')

// Base kyt config for development.
module.exports = {
  reactHotLoader: true,
  debug: false,
  modifyWebpackConfig: (baseConfig, options) => {
    return getWebpackConfig(baseConfig, options)
  }
}

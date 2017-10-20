export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  isServer: process.env.IS_SERVER || false,
  isDev: process.env.NODE_ENV !== 'production'
}

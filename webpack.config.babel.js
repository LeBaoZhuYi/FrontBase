import devConfig from './config/webpack.dev.js'
import prodConfig from './config/webpack.prod.js'

module.exports = process.env.ENV === 'production' ? prodConfig : devConfig

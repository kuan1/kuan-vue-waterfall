const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const base = require('./webpack.base.conf')
const merge = require('webpack-merge')


const config = merge(base, {
  context: path.resolve(__dirname, '../'),
  entry: './src/waterFall',
  output: {
    filename: 'kuan-vue-waterfall.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
    // ,
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // })
  ]
})

config.plugins = (config.plugins || []).concat([

  new CopyWebpackPlugin([
    { from: './src/waterfall.vue' },
    { from: './src/waterfall-slot.vue' }
  ]),

])

module.exports = config

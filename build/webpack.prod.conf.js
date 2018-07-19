const path = require('path')
const base = require('./webpack.base.conf')
const merge = require('webpack-merge')

const config = merge(base, {
  context: path.resolve(__dirname, '../'),
  entry: './src/waterFall/lib-entry.js',
  output: {
    filename: 'kuan-vue-waterfall.min.js',
    library: 'waterfall',
    libraryTarget: 'umd'
  },
  plugins: [
    // ,
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: '"production"'
    //   }
    // })
  ]
})

module.exports = config

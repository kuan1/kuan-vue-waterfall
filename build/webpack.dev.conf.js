const merge = require('webpack-merge');

const common = require('./webpack.base.conf.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    // hot: true,
    // inline: true,
    // contentBase: [path.join(__dirname, '../public'),],
    port: process.env.PORT || 8088,
    publicPath: '/',
    host: '0.0.0.0',
    openPage: '',
    useLocalIp: true,
    historyApiFallback: false,
    noInfo: false,
    stats: 'minimal',
    open: true
  },
});

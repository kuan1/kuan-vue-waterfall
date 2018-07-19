const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [resolve('src')],
      //   options: {
      //     formatter: require('eslint-friendly-formatter'),
      //     emitWarning: true
      //   }
      // },
      {test:/.vue$/, loader:'vue-loader', options: vueLoaderConfig},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isDev ? false : 'warning',
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ],
};

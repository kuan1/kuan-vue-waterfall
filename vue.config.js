const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const resolve = (dir) => path.resolve(__dirname, dir)

const distName = 'demo' // 项目名称

const config = {
  publicPath: isDev ? '/' : `/kuan-vue-waterfall/demo/`, // public path
  outputDir: resolve(`${distName}`), // 输入地址
  devServer: {
    proxy: 'https://www.luzhongkuan.cn',
    disableHostCheck: true,
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    externals: {
      vue: { commonjs: 'vue', commonjs2: 'vue', root: 'Vue' },
    },
    entry: {
      app: path.resolve(__dirname, 'src/index.js'),
    },
  },
}

const testConfig = {
  publicPath: '/', // public path
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, 'test/index.js'),
    },
  },
}

module.exports = process.env.BUILD_TARGET === 'test' ? testConfig : config

import Vue from 'vue'

import App from './App'

import waterFall from './waterFall'
console.log(waterFall)
Vue.use(waterFall) // 全局注册

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

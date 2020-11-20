import { createApp } from 'vue'
import App from './App.vue'
import $http from './$http'

const app = createApp(App)
app.config.globalProperties.$http = $http

app.mount('#app')

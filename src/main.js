import Vue from 'vue'
import App from './App'
import router from './routers'
import store from './store'
import './plugins/index'
import axios from 'axios'
import 'lib-flexible'
Vue.config.productionTip = false
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

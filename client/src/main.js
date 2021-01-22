import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import { sync } from "vuex-router-sync"
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
sync(store, router)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

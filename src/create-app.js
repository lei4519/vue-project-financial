import Vue from 'vue'
import App from './app.vue'
import { sync } from 'vuex-router-sync'
import createRouter from './route/router.js'
import createStore from './store/store.js'
const isServer = process.env.VUE_ENV === 'server'

if (!isServer) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

export default () => {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return {app, router, store}
}

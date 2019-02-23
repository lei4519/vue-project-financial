import Vue from 'vue'
import App from './app.vue'
import { sync } from 'vuex-router-sync'
import createRouter from './route/router.js'
import createStore from './store/store.js'

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

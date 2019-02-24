import Vue from 'vue'
import createApp from './create-app'
import './style/reset.scss'
import "swiper/dist/css/swiper.css"

import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr"
Vue.use(VueAwesomeSwiper)

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  app.$mount('#app')
})
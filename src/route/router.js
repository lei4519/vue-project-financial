import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        name: 'home',
        path: '/home',
        component: () => import('views/home/home.vue')
      },
    ]
  })
}
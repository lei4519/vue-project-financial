import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
import fetchData from 'api/home'

export default () => {
  return new Vuex.Store({
    state: () => ({
      homeData: {}
    }),
    mutations: {
      setHomeData(state, data) {
        state.homeData = data
      }
    },
    actions: {
      fetchHomeData({commit}) {
        return fetchData()
          .then(({data}) => {
            commit('setHomeData', data)
          })
      }
    },
    getters: {
      swiper: state => state.homeData
    },
    plugins: [createLogger()],
    strict: process.env.NODE_ENV !== 'production'
  })
}

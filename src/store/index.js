import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curMenu: {
      name: '剧集',
      bgColor: '#FFFF77'
    }
  },
  mutations: {
    setCurMenu(state, menu) {
      state.curMenu = menu
    }
  },
  actions: {
  },
  modules: {
  }
})

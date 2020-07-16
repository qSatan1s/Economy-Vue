import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import search from './search'
import favorites from './favorites'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    info,
    search,
    favorites
  }
})

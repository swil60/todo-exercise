import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import priorities from './modules/priorities'
import statuses from './modules/statuses'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos,
    priorities,
    statuses
  },
})
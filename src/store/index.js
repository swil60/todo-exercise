import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import priorities from './modules/priorities'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos,
    priorities
  },
})
import axios from 'axios';

// initial state
const state = () => ({
    all: []
})

const mutations = {
  setPriorities (state, priories){
    state.all = priories;
  }
}

const actions = {
  fetchAllPriorities ({ commit }) {
      axios.get(`http://localhost:5678/data/to-do-api/priorities`)
      .then(res => {
          commit('setPriorities',res.data.data)
      });
  }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
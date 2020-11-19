import axios from 'axios';

// initial state
const state = () => ({
    all: []
})

const mutations = {
    setStatuses (state, todos){
      state.all = todos;
    }
  }
  
const actions = {
    fetchAllStatuses ({ commit }) {
        axios.get(`http://localhost:5678/data/to-do-api/statuses`)
        .then(res => {
            console.log("we are here");
            commit('setStatuses',res.data.data)
        });
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
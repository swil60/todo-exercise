// initial state
import axios from 'axios';
const state = () => ({
    all: []
})


// mutations
const mutations = {
  setTodos (state, todos){
    state.all = todos;
  },
  addNewTodo (state, newTodo ) {
   let lastTodo =  state.all[state.all.length -1] 
   newTodo.id = lastTodo.id + 1 //increment the id
   state.all.push(newTodo)
  }
}

const actions = {
  fetchAllTodo ({ commit }) {
    axios.get(`http://localhost:5678/data/to-do-api/to-do`)
      .then(res => {
        commit('setTodos',res.data.data)
      });
  //  commit('increment')
  }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
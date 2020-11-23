// initial state
import axios from 'axios'
const base_url = process.env.BASE_URL
const state = () => ({
    all: []
})


// mutations
const mutations = {
  setTodos (state, todos){
    state.all = todos;
  },
  createTodo (state, newTodo ) {
    
    let newId = null;
    if(state.all.length > 0)
    {
      const lastTodo =  state.all[state.all.length -1] 
      newId = lastTodo.id + 1;
    }else
    {
       newId = 1;
    }

   let dataToAdd = Object.assign({},newTodo);
   dataToAdd.id =  newId//increment the id
   state.all.push(dataToAdd)
  },
  updateTodo (state, currentTodo ) {
    state.all = state.all.map(todo => {
      if (todo.id === currentTodo.id) {
        return Object.assign({}, todo, currentTodo)
      }
      return todo
    })
   },
   markAllToDosAsDone(state)
   {
    state.all = state.all.map(todo => {
      todo.is_complete = true;      
      return todo
    })
   },
   removeTodo (state, id ) {
    state.all = state.all.filter(todo => todo.id != id);
   },
   clearCompleted(state){
    state.all = state.all.filter(todo => !todo.is_complete);
   }
}

const actions = {
  async fetchAllTodo ({ commit }) {
    const res = await axios.get(`${base_url}/data/todo-api/todo`)
    commit('setTodos',res.data.data)
  },
  async createTodo ({commit},todo){
    const res = await axios.post(`${base_url}/data/todo-api/todo`,todo)
    commit('createTodo',todo) 
  },
  async updateTodo ({commit},todo){
    const res = await axios.put(`${base_url}/data/todo-api/todo/${todo.id}`,todo)
    commit('updateTodo',todo) 
  },
  async removeTodo ({commit},todoId){
    const res = await axios.delete(`${base_url}/data/todo-api/todo/${todoId}`)
    commit('removeTodo',todoId) 
  },
  async clearCompleted ({commit}){
    const res = await axios.delete(`${base_url}/data/todo-api/todo/completed`)
    commit('clearCompleted') 
  },
  async markAllToDosAsDone ({commit}){
    const res = await axios.put(`${base_url}/data/todo-api/todo/mark-all-as-done`)
    commit('markAllToDosAsDone') 
  },
}

const getters = {
  completeTodos: state => {
    return state.all.filter(todo => todo.is_complete)
  },
  incompleteTodos: state => {
    return state.all.filter(todo => !todo.is_complete)
  },
  incompleteTodosCount: (state,getters) => {
    return getters.incompleteTodos.length
  },
  hasTodos: state => {
    return state.all.length > 0;
  },
  hasCompleteTodos: (state,getters) => {
    return getters.completeTodos.length > 0;
  }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
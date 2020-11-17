// initial state
const state = () => ({
    all: [
          {
          id:1,
          description:"This is the description"
        },
        {
          id:2,
          description:"this is the second description"
        }
      ]
})


// mutations
const mutations = {
  addNewTodo (state, newTodo ) {
   let lastTodo =  state.all[state.all.length -1] ;
   newTodo.id = lastTodo.id + 1; //increment the id
   state.all.push(newTodo)
  },
}

export default {
    namespaced: true,
    state,
    mutations
}
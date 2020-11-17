// initial state
const state = () => ({
    all: 
    [
        {
          id:1,
          name:"low",
          status_id: 1,
          priority_id: 2
        },
        {
          id:2,
          name:"medium",
          status_id: 1,
          priority_id: 2
        },
        {
          id:3,
          name:"High",
          status_id: 1,
          priority_id: 2
        }
      ]
})

export default {
    namespaced: true,
    state,
}
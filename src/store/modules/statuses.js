// initial state
const state = () => ({
    all: [
        {
            id:1,
            name:"To Do"
        },
        {
            id:2,
            name:"In Progress"
        },
        {
            id:3,
            name:"Done"
        }
    ]
})

export default {
    namespaced: true,
    state,
}
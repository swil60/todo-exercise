
import TodoList from '../components/TodoList.vue'
import TodoListForm from '../components/TodoListForm.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    { path: '/', component: TodoList }
]

export default new VueRouter({
    routes // short for `routes: routes`
})

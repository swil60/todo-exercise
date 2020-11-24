
import TodoList from '../components/TodoList.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    { path: '/', component: TodoList },
    { path: '/:filter', component: TodoList }
]

export default new VueRouter({
    routes // short for `routes: routes`
})
<template>
<div>
  <h1>
    Todos
  </h1>

  <ul class="list-group">
    <li class="list-group-item">
      <div class="row">
        <div class="col-md-3 text-center">
          <i class="fas fa-2x fa-chevron-down" @click="markAllNotesAsDone()"></i>
        </div>
        <div class="col-md-9">
            <todo-list-form :todo="newTodo" :commitMethod="'todos/createTodo'" @submitted="clearNewTodo()"></todo-list-form>
        </div>
      </div>
    </li>
    <li v-for="item in filteredTodos" :key="item.id" class="list-group-item">
      <todo-list-item :todo="item"></todo-list-item>
    </li>
    <li class="list-group-item">
      <todo-list-toolbar @apply-filter-type="setFilterType"></todo-list-toolbar>
    </li>
  </ul>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import TodoListForm from './TodoListForm.vue'
import TodoListItem from './TodoListItem.vue'
import TodoListToolbar from './TodoListToolbar.vue'

export default {
  components: { 
    TodoListForm,
    TodoListItem,
    TodoListToolbar
  },
  name: 'TodoList',
  methods:{
    clearNewTodo(){
      this.newTodo = {
          id:null,
          description:null,
          is_complete:null,
          priority_id:null
      };
    },
    retriveData()
    {
        this.$store.dispatch('todos/fetchAllTodo')
    },
    setFilterType(event,filterType)
    {
      this.filterType = filterType
    },
    markAllNotesAsDone()
    {
      this.$store.commit('todos/markAllToDosAsDone')
    }
  },
 computed:{
    filteredTodos () { 
      switch (this.filterType) {
        case 'completed':
            return this.completeTodos
        case 'active':
            return this.incompleteTodos
        default:
        return this.allTodos
      }
    },
  ...mapGetters({
    completeTodos: 'todos/completeTodos',
    incompleteTodos: 'todos/incompleteTodos'
  }),
  ...mapState({
    priorities: state => state.priorities.all,
    allTodos: state => state.todos.all,
  }),
 },
  data() {
    return {
        filterType:'all',
        newTodo:{
          id:null,
          description:null,
          is_complete:null,
          priority_id:null
        }
    }
  },
  created() {
    // `this` points to the vm instance
    this.retriveData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .list-group-item
    {
      padding: 0;
      padding: 0.2rem 0rem;
    }
</style>

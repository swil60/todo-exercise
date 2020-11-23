<template>
<div>
  <h1 class="text-center">
    todos
  </h1>

  <div v-if="hasError" class="alert alert-danger">
    {{ errorMessage }}
  </div>
  <ul v-else class="list-group">
    <li class="list-group-item">
      <div class="row">
        <div class="col-md-3 text-center">
          <i class="fas fa-2x fa-chevron-down" @click="markAllNotesAsDone()"></i>
        </div>
        <div class="col-md-9">
            <todo-list-form :allowEmpty="true" :todo="newTodo" :actionMethod="'todos/createTodo'" @submitted="clearNewTodo()"></todo-list-form>
        </div>
      </div>
    </li>
    <li v-for="item in filteredTodos" :key="item.id" class="list-group-item">
      <todo-list-item :todo="item"></todo-list-item>
    </li>
    <li class="list-group-item footer">
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
    async retriveData()
    {
      try {
        await this.$store.dispatch('todos/fetchAllTodo')
      } catch (error) {
        this.errorMessage = error.response.data.message;
      }
    },
    setFilterType(event,filterType)
    {
      this.filterType = filterType
    },
    markAllNotesAsDone()
    {
      try {
          this.$store.dispatch('todos/markAllToDosAsDone')
      } catch (error) {
        
      }
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
    hasError() {
      return this.errorMessage != null && this.errorMessage.length > 0
    },
  ...mapGetters({
    completeTodos: 'todos/completeTodos',
    incompleteTodos: 'todos/incompleteTodos'
  }),
  ...mapState({
    allTodos: state => state.todos.all,
  }),
 },
  data() {
    return {
        filterType:'all',
        errorMessage:null,
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

 h1{
    font-weight: 100 !important;
    font-size: 5rem;
    color: rgba(175, 47, 47, 0.15);
  }

.list-group {
  border-radius: 0;
  padding: 0;
  border-radius: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
 .list-group-item
    {
      padding: 0;
      padding: 0.2rem 0rem;
  }

  .footer
  {
    color: #777;
  }

  .footer::before
  {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
</style>

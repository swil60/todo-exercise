<template>
    <div class="row todo-item">
      <div class="col-3 text-center">
        <i class="far fa-3x" @click="toggleCompleteStatus()" :class="{'fa-check-circle text-success':todo.is_complete,'fa-circle':!todo.is_complete}"></i>
      </div>
      <div class="col-9">
        <i @click="removeItem()"  class="far fa-3x fa-times-circle text-danger complete-icon"></i>
        <todo-list-form v-if="onEditState" :todo="todo" :commitMethod="'todos/updateTodo'" @submitted="toggleEditState()"></todo-list-form>
        <div v-else>
            <div @dblclick="toggleEditState()" :class="{'completed-item':todo.is_complete}">
                {{ todo.description }}
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import TodoListForm from './TodoListForm.vue';
export default {
  components: { TodoListForm },
  name: 'TodoListItem',
  data(){
      return {
          onEditState: false
      }
  },
  props:{
      todo: {
        type: Object,
        required: true
      }
  },
  methods:{
    toggleEditState()
    {
        this.onEditState = !this.onEditState;
    },
    toggleCompleteStatus()
    {
        this.todo.is_complete = !this.todo.is_complete;
        this.$store.commit('todos/updateTodo',this.todo)
    },
    removeItem()
    {
        this.$store.commit('todos/removeTodo',this.todo)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .completed-item {
          text-decoration: line-through;
    }
    .complete-icon
    {
      position: absolute;
      right: 10px;
      opacity: 0;
    }
    .todo-item:hover .complete-icon{
      opacity: 1;
    }
</style>

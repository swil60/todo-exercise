<template>
    <div class="row todo-item">
      <div class="col-2 text-center">
        <i class="far fa-3x" @click="toggleCompleteStatus()" :class="{'fa-check-circle text-success':todo.is_complete,'fa-circle':!todo.is_complete}"></i>
      </div>
      <div class="col-9">
        <todo-list-form v-if="onEditState" :allowEmpty="false" :todo="todo" :actionMethod="'todos/updateTodo'" @submitted="toggleEditState"></todo-list-form>
        <div v-else>
          <div class="clickable-item">
              <div @dblclick="toggleEditState()" :class="{'completed-item':todo.is_complete}">
                  {{ todo.description }}
              </div>
          </div>
        </div>
      </div>
      <div class="col-1">
          <i @click="removeItem()"  class="far fa-3x fa-times-circle text-danger complete-icon float-right"></i>
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
    async toggleCompleteStatus()
    {
        try {
            this.todo.is_complete = !this.todo.is_complete;
            await this.$store.dispatch('todos/updateTodo',this.todo)
        } catch (error) {
            console.log(error)
        }
    
    },
    async removeItem()
    {
      try {
          await this.$store.dispatch('todos/removeTodo',this.todo.id)
      } catch (error) {
        console.error(error);
      }
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
      opacity: 0;
    }
    
  .clickable-item{
    padding: 0.8rem 2rem;
    display: block;
    cursor: pointer;
    width: 100%;
  }

  .todo-item:hover .complete-icon{
    opacity: 1;
  }
</style>

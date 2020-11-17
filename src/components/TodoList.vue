<template>
  <div>
    <div>
      <textarea v-model="newTodo.description"></textarea>
      
      <select v-model="newTodo.priority_id">
        <option :value="null">Select The Priority</option>
        <option v-for="item in priorities" :key="item.id" :value="item.id">
            {{ item.name }}
        </option>
      </select>
      
      <select v-model="newTodo.status_id">
        <option :value="null">Select The Status</option>
         <option v-for="item in statuses" :key="item.id" :value="item.id">
            {{ item.name }}
        </option>
      </select>

        <button @click="addNewNote()">
          Add New Note
        </button>
    </div>
    <ul>
      <li v-for="item in todos" :key="item.id">
        {{ item.description }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TodoList',
  methods:{
    addNewNote(){
      let stateToAdd = Object.assign({},this.newTodo);
      this.$store.commit('todos/addNewTodo',stateToAdd);
      this.clearNewToDo();//not sure how to do this better
    },
    clearNewToDo(){
      this.newTodo = {
          id:null,
          description:null,
          status_id:null,
          priority_id:null
      };
    },
    removeTodo(id){
        console.log(id)
    },
  },
 computed: mapState({
    priorities: state => state.priorities.all,
    statuses: state => state.statuses.all,
    todos: state => state.todos.all,
  }),
  data() {
    return {
        newTodo:{
          id:null,
          description:null,
          status_id:null,
          priority_id:null
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

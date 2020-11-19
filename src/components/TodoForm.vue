<template>
    <div>
        <h1>
            Add New To Do
        </h1>
        <div class="alert alert-danger" v-if="validationErrors.length > 0">
            <ul>
                <li v-for="(validationError,index) in validationErrors" :key="index">
                    {{ validationError }}
                </li>
            </ul>
        </div>
        <div class="form-group">
            <label for="description-field">Description</label>
            <textarea id="description-field" v-model="newTodo.description" class="form-control"></textarea>
        </div>
        <div class="form-group">
            <label for="priority-field">Select Priority</label>
            <select if="priority-field" v-model="newTodo.priority_id" class="form-control">
                <option :value="null">Select The Priority</option>
                <option v-for="item in priorities" :key="item.id" :value="item.id">
                    {{ item.name }}
                </option>
            </select>
        </div>
        <div class="form-group">
            <label for="status-field">Select Status</label>
            <select id="status-field" v-model="newTodo.status_id" class="form-control">
                <option :value="null">Select The Status</option>
                <option v-for="item in statuses" :key="item.id" :value="item.id">
                    {{ item.name }}
                </option>
            </select>
        </div>

        <button class="btn btn-primary" @click="addNewNote()">
          Add New Note
        </button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TodoForm',
  methods:{
    addNewNote(){
        this.validate();
        if(this.validationErrors.length == 0)
        {
            let stateToAdd = Object.assign({},this.newTodo);
            this.$store.commit('todos/addNewTodo',stateToAdd);
            this.clearNewToDo();//not sure how to do this better
            this.clearValidationErrors();
        }
    },
    clearNewToDo(){
      this.newTodo = {
          id:null,
          description:null,
          status_id:null,
          priority_id:null
      };
    },
    validate(){
        this.clearValidationErrors();
        if(this.newTodo.status_id == null)
        {
            this.validationErrors.push("Please set the status");
        }

        if(this.newTodo.priority_id == null)
        {
            this.validationErrors.push("Please set the priority");
        }

        if(this.newTodo.description == '')
        {
            this.validationErrors.push("Please set the description");
        }
    },
    clearValidationErrors()
    {
        this.validationErrors = [];
    },
    getStatusName(status_id)
    {
      let activeStatus = this.statuses.find(status => status.id == status_id)
      if(activeStatus)
      {
        return activeStatus.name;
      }
      return null;
    },
    retriveData()
    {
      this.$store.dispatch('statuses/fetchAllStatuses')
      this.$store.dispatch('priorities/fetchAllPriorities')
    },
    getPriorityName(priority_id)
    {
      let activePriority = this.priorities.find(priority => priority.id == priority_id)
      if(activePriority)
      {
        return activePriority.name;
      }
      return null;
    }
  },
 computed: mapState({
    priorities: state => state.priorities.all,
    statuses: state => state.statuses.all,
  }),
  data() {
    return {
        validationErrors:[],
        newTodo:{
          id:null,
          description:null,
          status_id:null,
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

</style>

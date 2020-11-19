<template>
<div>
  <h1>
    Todos
  </h1>
  <div class="row">
    <div v-for="item in todos" :key="item.id" class="col-3">
     <div class="card">
       <div class="card-body">
         <div class="row">
           <div class="col-12">
            {{ item.description }}
           </div>
         </div>
         <div class="row">
           <div class="col-6">
            {{ getStatusName(item.status_id) }}
           </div>
           <div class="col-6">
            {{ getPriorityName(item.priority_id) }}
           </div>
         </div> 
            <!-- Example split danger button -->
            <div class="btn-group">
              <button type="button" class="btn btn-danger">Action</button>
              <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="sr-only">Toggle Dropdown</span>
              </button>
              <div class="dropdown-menu">
                <a v-for="status in statuses" :key="status.id" class="dropdown-item" href="#">
                  {{ status.name }}
                </a>
              </div>
            </div>
       </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TodoList',
  methods:{
    removeTodo(id){
        console.log(id)
    },
    retriveData()
    {
      this.$store.dispatch('todos/fetchAllTodo')
      this.$store.dispatch('statuses/fetchAllStatuses')
      this.$store.dispatch('priorities/fetchAllPriorities')
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

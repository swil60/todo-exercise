<template>
  <div class="row">
  <div class="col-3">
        {{ incompleteTodosCount }} Items left
  </div>
    <div class="col-6">
      <div class="text-center">
          <button class="btn btn-outline-primary btn-sm mr-2" v-for="filter in filters" :key="filter.name" :class="{ active: filter.isActive }" @click="setFilter($event,filter)">
            {{ filter.name }}
          </button>
      </div>
    </div>
    <div class="col-3">
      <button v-if="hasCompleteTodos" class="btn btn-link btn-sm float-right" @click="clearCompletedNotes()">
          Clear Completed
        </button>
    </div>
</div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TodoListToolbar',
  data(){
      return {
        activeFilter:null,
        filters:[
          {
            name:'All',
            type:'all',
            isActive:true
          },
           {
            name:'Active',
            type:'active',
            isActive:false
          },
          {
            name:'Completed',
            type:'completed',
            isActive:false
          }
        ]
      }
  },
  computed:mapGetters({
    incompleteTodosCount: 'todos/incompleteTodosCount',
    hasCompleteTodos:'todos/hasCompleteTodos'
  }),
  methods:{
   clearCompletedNotes()
   {
     this.$store.commit('todos/clearCompleted')
   },
   setFilter($event,activeFilter)
   {
     this.filters.forEach( (filter)=> {
       filter.isActive = false
     })
     activeFilter.isActive = true;
     this.$emit('apply-filter-type',$event,activeFilter.type);
   }
  },
  created()
  {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

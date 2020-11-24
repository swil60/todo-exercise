<template>
  <div class="row">
  <div class="col-3">
      <div class="ml-3">
        {{ incompleteTodosCount }} Items left
      </div>
  </div>
    <div class="col-6">
      <div class="text-center">
          <button class="btn btn-outline-primary btn-sm mr-2" v-for="filter in filters" :key="filter.name" :class="{ active: activeFilter == filter.type }" @click="setFilter($event,filter)">
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
  props:{
    activeFilter:{
      type:String,
      required:true
    },
  },
  data(){
      return {
        filters:[
          {
            name:'All',
            type:'all',
          },
           {
            name:'Active',
            type:'active',
          },
          {
            name:'Completed',
            type:'completed',
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
     this.$store.dispatch('todos/clearCompleted')
   },
   setFilter($event,activeFilter)
   {
     this.$emit('apply-filter-type',$event,activeFilter.type);
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

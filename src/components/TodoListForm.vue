<template>
    <div>
        <div class="alert alert-danger" v-if="validationErrors.length > 0">
            <ul>
                <li v-for="(validationError,index) in validationErrors" :key="index">
                    {{ validationError }}
                </li>
            </ul>
        </div>
        <form @submit="submitTodo()">
          <div class="form-group">
              <label for="description-field" class="sr-only">Description</label>
              <input placeholder="What needs to be Done?" id="description-field" v-model="todo.description" class="form-control" type="text">
          </div>
        </form> 
    </div>
</template>

<script>
export default {
  name: 'TodoForm',
  methods:{
    submitTodo(){
        this.validate();
        if(this.validationErrors.length == 0)
        {
            this.$store.commit(this.commitMethod,this.todo);
            this.clearValidationErrors();
            this.$emit('submitted',this.todo)
        }
    },
    validate(){
        this.clearValidationErrors();
        if(this.todo.description == '')
        {
            this.validationErrors.push("Please set the description");
        }
    },
    clearValidationErrors()
    {
        this.validationErrors = [];
    },
    retriveData()
    {
      this.$store.dispatch('priorities/fetchAllPriorities')
    }
  },
  props:{
    todo:{
      type:Object,
      required:true
    },
    commitMethod:{
      type:String,
      required:true
    }
  },
  data() {
    return {
        validationErrors:[]
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
  .form-group
  {
      margin-bottom: 0;
  }
  .form-control{
      border: 0;
      border-radius: 0;
  }
</style>

<template>
    <div>
          <div class="form-group">
              <label for="description-field" class="sr-only">Description</label>
              <input v-todo-focus="focus"  @keyup.enter.stop="$event.target.blur()" @blur.stop="submitTodo($event)" :class="{'is-invalid':validationError}" placeholder="What needs to be done?" id="description-field" v-model="todo.description" class="form-control" type="text">
                <div v-if="validationError" class="invalid-feedback">
                  {{ validationError }}
                </div>
          </div>
    </div>
</template>

<script>
export default {
  name: 'TodoForm',
  methods:{
    async submitTodo(event){
          console.log("i got fired",event);
        if(this.allowEmpty && this.isDescriptionEmpty)
        {

        }else
        {
          this.validate();
            if(this.validationError == null)
            {
                try {
                  await this.$store.dispatch(this.actionMethod,this.todo)
                } catch (error) {
                  console.log(error);
                }
                this.clearValidationError();
                this.focus = false;
                this.$emit('submitted',this.todo)
            }
        }
       
    },
    validate(){
        this.clearValidationError();
        if(this.isDescriptionEmpty)
        {
            this.validationError = "Please set a valid description";
        }
    },
    clearValidationError()
    {
        this.validationError = null;
    }
  },
  props:{
    todo:{
      type:Object,
      required:true
    },
    actionMethod:{
      type:String,
      required:true
    },
    allowEmpty:{
      type:Boolean,
      required:true
    }
  },
  computed:
  {
    isDescriptionEmpty(){
      return this.todo.description == null || (this.todo.description.trim().length == 0)
    }
  },
  data() {
    return {
        focus:false,
        validationError:null
    }
  },
  created(){
    this.focus = true
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
      padding: 1.5rem .75rem;
  }
</style>

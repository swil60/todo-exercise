import Vue from 'vue'
export default (el,binding)=>{
    Vue.nextTick(() => {
        if(binding.value)
        {
            el.focus()
        }
    });
}
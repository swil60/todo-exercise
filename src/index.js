import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './directives'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

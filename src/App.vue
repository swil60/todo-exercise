<template>
  <div id="app">

  <div class="container">
    <div class="row">
      <div class="col-md-8 m-auto">
      <router-view></router-view>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import router from './router'


export default {
  name: 'App',
  router
}
</script>

<style>
  body
  {
    background-color: whitesmoke !important;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  }
</style>

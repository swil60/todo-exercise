<template>
  <div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">
      Notes Exercise
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link">
          View Notes
        </router-link>
         <router-link to="/create" class="nav-item nav-link">
          Add New Note
        </router-link>
      </div>
    </div>
  </nav>
  <div class="container">
      <router-view></router-view>
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
.list-group {
  border-radius: 0;
  padding: 0.2rem 0rem;
}
</style>

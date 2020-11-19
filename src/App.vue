<template>
<div class="container">
  <div id="app">
    <todo-form></todo-form>
    <todo-list></todo-list>
  </div>
</div>
</template>

<script>
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'

export default {
  name: 'App',
  components: {
    TodoList,
    TodoForm
  }
}
</script>

<style>
</style>

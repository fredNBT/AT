<template>
  <div id="app">
    <div class="container">
          <AddTodo></AddTodo>
          <Alarms></Alarms>
          <FilterTodos></FilterTodos>
    <ToDo></ToDo>

    </div>
  </div>
</template>

<script>
import ToDo from './components/ToDo.vue';
import AddTodo from './components/AddTodo.vue';
import FilterTodos from './components/filterTodos.vue';
import Alarms from './components/Alarms.vue';

export default {
  name: 'App',
  components: {
    ToDo,
    AddTodo,
    FilterTodos,
    Alarms
  }
}
</script>

<style>

.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}

</style>

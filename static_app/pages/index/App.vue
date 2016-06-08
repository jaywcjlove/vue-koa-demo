<template>
  <div id="app">
    <hello></hello>
    <h1>{{ msg }}</h1>
    <div v-for="(index, item) in items">
      {{ index }} {{ item.message }}
    </div>
  </div>
</template>

<script>
import Hello from './../../components/Hello'
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!222333',
      items: [
        { message: 'Foo23' },
        { message: 'Bar' }
      ]
    }
  },
  components: {
    Hello
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

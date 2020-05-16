<template>
  <div id="app">
    app根组件
    <login />
    <login></login>
  </div>
</template>

<script>
import login from '@/components/Login.vue'
export default {
  name: 'app',
  components: {
    login
  }
}
</script>

<style>
div {
  color: #ccc;
}
</style>

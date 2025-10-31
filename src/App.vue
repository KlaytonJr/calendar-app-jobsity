<template>
  <VCalendar />
</template>

<script>
import VCalendar from './components/calendar/VCalendar.vue'

export default {
  name: 'App',
  components: {
    VCalendar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

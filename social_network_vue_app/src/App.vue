<template>
    <h1 id="social_network_title">Welcome to LevBook</h1>
    <LoginPortal />
</template>

<script>
import LoginPortal from './components/LoginPortal';

export default {
  name: 'App',
  components: {
      LoginPortal
  },
}
</script>

<style>
#social_network_title {
    text-align: left;
    margin-left: 50px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

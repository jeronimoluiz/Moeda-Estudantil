<template>
  <div id="app">
    <a-button id = "botão" type="primary">Login</a-button>
     <br/>
    <a-button id = "botão" type="primary">Sign Up</a-button>
  </div>
</template>

<script>

export default {
  name: 'Register',
  components: {
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
#logo{
  margin-top: 15px;
  margin-bottom: 20px;
}
#botão{
  margin-top: 30px;
}
</style>

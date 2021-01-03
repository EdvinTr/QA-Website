<template>
  <div id="app" class="container">
    <Navbar />
    <!-- <img src="./assets/logo-mdb-vue-small.png"> -->
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
}
</style>

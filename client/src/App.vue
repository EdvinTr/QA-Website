<template>
  <div id="app">
    <Navbar />
    <!-- <img src="./assets/logo-mdb-vue-small.png"> -->
    <router-view />
    <div class="spacer"></div>

    <div v-cloak>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.btn {
  background-image: linear-gradient(to bottom, #333 0, #111 100%);
}

body {
  background-color: rgb(241, 242, 242);
}
.spacer {
  height: 55rem;
}
</style>

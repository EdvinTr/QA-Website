<template>
  <div id="app">
    <Navbar />
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
.btn {
  background-image: linear-gradient(to bottom, #333 0, #111 100%);
}
[v-cloak] {
  display: none;
}

body {
  background-color: rgb(241, 242, 242);
}
.spacer {
  height: 55rem;
}
.text-muted {
  font-size: 13px;
}
.btn-danger {
  background-image: linear-gradient(to right, #ff0000de, #ff1e00d8);
}
</style>

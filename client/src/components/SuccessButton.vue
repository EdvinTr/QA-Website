<template>
  <mdb-btn color="primary" class="btn-answer">{{ buttonText }}</mdb-btn>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "SucessButton",
  props: ["buttonText"],

  components: {
    mdbBtn,
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
}
</style>


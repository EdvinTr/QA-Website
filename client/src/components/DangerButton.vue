<template>
  <div>
    <mdb-btn color="info" class="btn-danger" @click="btnClickHandler">{{
      this.buttonText
    }}</mdb-btn>
    <h4>{{ this.id }}</h4>
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "DangerButton",

  components: {
    mdbBtn,
  },
  props: {
    btnClickHandler: {
      type: Function,
    },
    buttonText: String,
    id: Number,
  },
};
</script>

<style scoped>
.btn-danger {
  background-image: linear-gradient(to right, #ff0000de, #ff1e00d8);
}
</style>


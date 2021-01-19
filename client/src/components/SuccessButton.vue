<template>
  <mdb-btn color="primary" class="btn-answer" @click="btnClickHandler">{{
    this.buttonText
  }}</mdb-btn>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "SucessButton",

  components: {
    mdbBtn,
  },
  props: {
    btnClickHandler: {
      type: Function,
    },
    buttonText: String,
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
  margin-left: 0;
}
</style>


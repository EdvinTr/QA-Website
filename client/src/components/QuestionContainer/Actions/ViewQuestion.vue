<template>
  <router-link
    :to="{ name: 'questionpage', params: { questionId: this.questionId } }"
  >
    <mdb-btn color="primary" class="btn-answer">View</mdb-btn>
  </router-link>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "ViewQuestion",
  props: ["questionId"],
  components: { mdbBtn },
  data() {
    return {};
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
  margin-left: 0;
}
</style>
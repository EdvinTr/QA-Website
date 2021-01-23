<template>
  <div v-if="showViewButton">
    <router-link :to="{ path: '/users/' + this.username }">
      <mdb-btn color="primary" class="btn-answer">View Profile</mdb-btn>
    </router-link>
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "ViewQuestion",
  props: ["username"],
  components: { mdbBtn },
  data() {
    return {
      showViewButton: true,
    };
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
  margin-left: 0;
}
</style>
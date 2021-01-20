<template>
  <div v-if="showViewButton">
    <router-link
      :to="{ name: 'questionpage', params: { questionId: this.questionId } }"
    >
      <mdb-btn color="primary" class="btn-answer">View</mdb-btn>
    </router-link>
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "ViewQuestion",
  props: ["questionId"],
  components: { mdbBtn },
  data() {
    return {
      showViewButton: true,
    };
  },
  methods: {},
  mounted() {
    if (this.$router.currentRoute.name == "questionpage") {
      this.showViewButton = false;
    }
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
  margin-left: 0;
}
</style>
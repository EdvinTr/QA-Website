<template>
  <mdb-btn
    color="primary"
    class="btn-danger"
    @click="() => deleteQuestionById(question.id)"
    >Delete</mdb-btn
  >
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  props: ["question"],
  name: "Delete",
  components: { mdbBtn },
  data() {
    return {};
  },
  methods: {
    async deleteQuestionById(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
</style>
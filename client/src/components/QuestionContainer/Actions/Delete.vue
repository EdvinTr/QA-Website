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
  props: ["question", "allQuestions"],
  name: "Delete",
  components: { mdbBtn },
  data() {
    return {
      questions: this.allQuestions,
    };
  },
  methods: {
    async deleteQuestionById(id) {
      try {
        this.$emit("clicked", id);
        console.log(id);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>
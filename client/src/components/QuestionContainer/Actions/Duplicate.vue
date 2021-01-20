<template>
  <mdb-btn
    color="primary"
    class="btn-duplicate"
    @click="() => markAsDuplicate(question.id, question.duplicate)"
    >Mark Duplicate</mdb-btn
  >
</template>

<script>
import { mdbBtn } from "mdbvue";
import QuestionService from "../../../services/QuestionService";
export default {
  name: "Duplicate",
  props: ["question"],
  components: { mdbBtn },
  data() {
    return {};
  },
  methods: {
    async markAsDuplicate(id, currentValue) {
      try {
        const isDuplicate = {
          duplicate: !currentValue,
        };
        await QuestionService.markQuestionAsDuplicate(id, isDuplicate);

        let updatedQuestions = this.$store.state.questions;
        updatedQuestions.forEach((question) => {
          if (question.id == id) {
            question.duplicate = !currentValue;
          }
        });
        this.$store.dispatch("setQuestions", updatedQuestions);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
  margin-left: 0;
}
</style>
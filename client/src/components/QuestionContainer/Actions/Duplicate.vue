<template>
  <mdb-btn
    color="primary"
    class="btn-duplicate"
    @click="() => markAsDuplicate(question.id, question.duplicate)"
  >
    <div v-if="!question.duplicate"><i class="fas fa-copy fa-lg"></i></div>
    <div v-if="question.duplicate"><i class="fas fa-copy fa-lg"></i></div>
  </mdb-btn>
</template>

<script>
import { mdbBtn } from "mdbvue";
import QuestionService from "../../../services/QuestionService";
export default {
  name: "Duplicate",
  props: ["question"],
  components: { mdbBtn },
  data() {
    return {
      buttonText: "Mark Duplicate",
    };
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
.btn-duplicate {
  margin-left: 0;
}
</style>
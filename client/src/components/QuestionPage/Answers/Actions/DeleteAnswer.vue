<template>
  <mdb-btn color="info" class="btn-danger" @click="() => deleteAnswer(answerId)"
    >Delete</mdb-btn
  >
</template>

<script>
import { mdbBtn } from "mdbvue";
import QuestionService from "../../../../services/QuestionService";
import AnswerService from "../../../../services/AnswerService";
export default {
  name: "DeleteAnswer",
  props: ["answerId"],
  components: { mdbBtn },
  data() {
    return {};
  },
  methods: {
    async deleteAnswer(id) {
      try {
        const answer = confirm("Are you sure you want to delete this answer?");
        if (answer) {
          await QuestionService.decrementAnswerCount(
            this.$store.state.route.params.questionId
          );

          await AnswerService.deleteAnswerById(id);

          const newAnswers = this.$store.state.answers.filter(
            (answer) => answer.id != id
          );
          this.$store.dispatch("setAnswers", newAnswers);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.btn-danger {
  margin-left: 0;
}
</style>
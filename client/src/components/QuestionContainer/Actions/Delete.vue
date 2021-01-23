<template>
  <mdb-btn
    color="primary"
    class="btn-danger"
    @click="() => deleteQuestionById(question)"
    >Delete</mdb-btn
  >
</template>

<script>
import { mdbBtn } from "mdbvue";
import QuestionService from "../../../services/QuestionService";
import AnswerService from "../../../services/AnswerService";
export default {
  props: ["question"],
  name: "Delete",
  components: { mdbBtn },
  data() {
    return {};
  },
  methods: {
    async deleteQuestionById({ id, userId }) {
      try {
        const answer = confirm(
          "Are you sure you want to delete this question?"
        );
        const x = prompt("Enter something");
        console.log(x);
        if (answer) {
          // Delete Question by ID
          await QuestionService.deleteQuestionById(id);
          const { data } = await AnswerService.findAnswersMappedToQuestionId(
            id
          );
          // Delete all answers associated with the question ID
          for (let i = 0; i < data.length; i++) {
            await AnswerService.deleteAnswerById(data[i].id);
          }
          // Updating the store by filtering out the question and after the user who created it
          const newQuestions = this.$store.state.questions.filter(
            (question) => question.id != id
          );
          let userQuestionsCount = 0;
          for (let i = 0; i < this.$store.state.questions.length; i++) {
            if (this.$store.state.questions[i].userId === userId) {
              userQuestionsCount++;
            }
          }
          // If this user only posted 1 question we can safely delete the user from the questionCreators array
          if (userQuestionsCount == 1) {
            const newQuestionCreators = this.$store.state.questionCreators.filter(
              (user) => user.id != userId
            );
            this.$store.dispatch("setQuestionCreators", newQuestionCreators);
          }
          this.$store.dispatch("setQuestions", newQuestions);
          if (this.$router.currentRoute.name != "questions")
            this.$router.push({ name: "questions" });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>
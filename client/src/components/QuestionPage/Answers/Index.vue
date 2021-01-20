<template>
  <div>
    <div v-for="answer in answers" :key="answer.id">
      <Answer :answer="answer" />
    </div>
    <CreateAnswer />
  </div>
</template>

<script>
import Answer from "./Answer";
import CreateAnswer from "./CreateAnswer";
import AnswerService from "../../../services/AnswerService";
import UserService from "../../../services/UserService";
export default {
  name: "AnswerContainer",
  props: ["question"],
  components: {
    Answer,
    CreateAnswer,
  },
  data() {
    return {
      answers: [],
      users: [],
    };
  },
  async mounted() {
    try {
      const answerData = await AnswerService.findAnswersMappedToQuestionId(
        this.question.id
      );
      this.answers = answerData.data;
      if (this.answers.length > 0) {
        // Find the users who posted the answers
        for (let i = 0; i < this.answers.length; i++) {
          let id = this.answers[i].userId;
          let { data } = await UserService.findUserById(id);
          this.users = [...this.users, data];
        }
      }
      console.log(this.answers);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
</style>
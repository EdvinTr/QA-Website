<template>
  <mdb-container v-if="user" class="userProfileContainer">
    <h3>{{ user.username }}s Profile</h3>
    <UserProfile :user="user" />
    <UserQuestions :questions="questions" :answerCount="answerCount" />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";
import UserQuestions from "../User/UserQuestions";
import UserProfile from "../User/UserProfile";
import UserService from "../../services/UserService";
import QuestionService from "../../services/QuestionService";
import AnswerService from "../../services/AnswerService";
export default {
  components: {
    mdbContainer,
    UserQuestions,
    UserProfile,
  },

  data() {
    return {
      user: null,
      questions: [],
      answerCount: [],
    };
  },
  async created() {
    try {
      const user = {
        username: this.$store.state.route.params.username,
      };
      const { data } = await UserService.findUserByUsername(user);
      this.user = data;

      const questions = await QuestionService.findQuestionsMappedToUserId(
        this.user.id
      );
      this.questions = questions.data;

      // Find all answers associated with this Consumers questions
      if (this.$store.state.userPrivilegeLevel == 1) {
        for (let i = 0; i < this.questions.length; i++) {
          const { data } = await AnswerService.findAnswersMappedToQuestionId(
            this.questions[i].id
          );
          const question = {
            questionId: this.questions[i].id,
            count: 0,
          };
          for (let i = 0; i < data.length; i++) {
            question.count = question.count + 1;
          }
          this.answerCount = [...this.answerCount, question];
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  methods: {},
};
</script>

<style scoped>
.userProfileContainer {
  margin-top: 3rem;
}
</style>
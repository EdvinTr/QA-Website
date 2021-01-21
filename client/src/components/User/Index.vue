<template>
  <mdb-container v-if="user" class="userProfileContainer">
    <h3>{{ user.username }}s Profile</h3>
    <UserProfile :user="user" />
    <UserQuestions :questions="questions" :user="user" />
    <UserAnswers :answers="answers" />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";
import UserQuestions from "../User/UserQuestions";
import UserAnswers from "../User/UserAnswers";
import UserProfile from "../User/UserProfile";
import UserService from "../../services/UserService";
import QuestionService from "../../services/QuestionService";
import AnswerService from "../../services/AnswerService";
export default {
  components: {
    mdbContainer,
    UserQuestions,
    UserProfile,
    UserAnswers,
  },

  data() {
    return {
      user: null,
      questions: [],
      answers: [],
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
      if (this.$store.state.userPrivilegeLevel == 2) {
        const answerData = await AnswerService.findAnswersMappedToUserId(
          this.$store.state.user.id
        );
        this.answers = answerData.data;
      }
      this.questions = questions.data;
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
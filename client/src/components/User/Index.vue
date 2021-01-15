<template>
  <mdb-container v-if="user" class="userProfileContainer">
    <h3>{{ user.username }}s Profile</h3>
    <UserProfile :user="user" />
    <UserQuestions :questions="questions" />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";
import UserQuestions from "../User/UserQuestions";
import UserProfile from "../User/UserProfile";
import UserService from "../../services/UserService";
import QuestionService from "../../services/QuestionService";
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
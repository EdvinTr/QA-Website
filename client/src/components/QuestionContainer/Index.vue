<template>
  <mdb-container v-if="this.users.length > 0">
    <h1>Question Comp</h1>
    <Card :users="this.users" :questions="questions" />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";

import Card from "../QuestionContainer/Card";
import UserService from "../../services/UserService";
import QuestionService from "../../services/QuestionService";
export default {
  components: {
    Card,
    mdbContainer,
  },
  data() {
    return {
      users: [],
      questions: [],
    };
  },
  async mounted() {
    try {
      window.scrollTo(0, 0);

      const questions = await QuestionService.getQuestions();
      this.questions = questions.data;
      for (const question of this.questions) {
        const { data } = await UserService.findUserById(question.userId);
        this.users = [...this.users, data];
      }
      console.log(this.users);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
</style>
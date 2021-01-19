<template>
  <mdb-container>
    <h1>Question Comp</h1>
    <Card :users="users" />
  </mdb-container>
</template>

<script>
import Card from "../QuestionContainer/Card";
import UserService from "../../services/UserService";
import { mdbContainer } from "mdbvue";
export default {
  components: {
    Card,
    mdbContainer,
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    try {
      const questions = this.$store.state.questions;
      for (const question of questions) {
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
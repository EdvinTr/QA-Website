<template>
  <div>
    <mdb-btn
      color="primary"
      class="btn-danger"
      @click="() => deleteUser(user.id)"
      >Delete</mdb-btn
    >
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
import AnswerService from "../../../../services/AnswerService";
import UserService from "../../../../services/UserService";
import QuestionService from "../../../../services/QuestionService";
export default {
  props: ["user"],
  name: "DeleteContributor",
  components: { mdbBtn },
  data() {
    return {};
  },
  methods: {
    async deleteUser(id) {
      try {
        const answer = confirm("Are you sure you want to delete the user?");
        if (answer) {
          // Get all answers
          const { data } = await AnswerService.findAnswersMappedToUserId(id);
          for (let i = 0; i < data.length; i++) {
            await AnswerService.deleteAnswerById(data[i].id);
          }
          const questions = await QuestionService.findQuestionsMappedToUserId(
            id
          );
          for (let i = 0; i < questions.data.length; i++) {
            await QuestionService.deleteQuestionById(questions.data[i].id);
          }
          await UserService.deleteById(id);
          let newUsers = this.$store.state.adminViewUsers.filter(
            (user) => user.id != id
          );
          this.$emit("deletedUser");
          this.$store.dispatch("setAdminViewUsers", newUsers);
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
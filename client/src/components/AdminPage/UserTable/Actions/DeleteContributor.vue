<template>
  <mdb-btn color="primary" class="btn-danger" @click="() => deleteUser(user.id)"
    >Delete</mdb-btn
  >
</template>

<script>
import { mdbBtn } from "mdbvue";
import AnswerService from "../../../../services/AnswerService";
import UserService from "../../../../services/UserService";
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
          await UserService.deleteById(id);
          let newUsers = this.$store.state.adminViewUsers.filter(
            (user) => user.id != id
          );
          this.$store.dispatch("setAdminViewUsers", newUsers);
          // Gather users again for the store
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
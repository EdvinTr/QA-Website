<template>
  <mdb-container>
    <h3 v-if="$store.state.user">
      This is the the page of {{ $store.state.user.username }}
    </h3>
    <UserQuestions />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";
import UserQuestions from "../User/UserQuestions";
import UserService from "../../services/UserService";
export default {
  components: {
    mdbContainer,
    UserQuestions,
  },

  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const user = {
        username: this.$store.state.route.params.username,
      };
      const { data } = await UserService.findUserByUsername(user);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {},
};
</script>

<style scoped>
</style>
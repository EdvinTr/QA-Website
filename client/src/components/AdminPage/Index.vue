<template>
  <mdb-container v-if="users.length > 0">
    <mdb-card>
      <mdb-card-body>
        <UsersView :users="users" />
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
import UserService from "../../services/UserService";
import UsersView from "./UserTable/UsersView";
import { mdbContainer, mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "AdminPage",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardBody,
    UsersView,
  },
  data() {
    return {
      users: [],
    };
  },
  async beforeCreate() {
    try {
      const { data } = await UserService.findAll();
      this.users = data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
</style>
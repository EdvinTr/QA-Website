<template>
  <mdb-container v-if="users.length > 0">
    <mdb-card>
      <mdb-card-body>
        <UsersView :users="users" />
      </mdb-card-body>
      <mdb-container>
        <AddContributor />
      </mdb-container>
    </mdb-card>
  </mdb-container>
</template>

<script>
import UserService from "../../services/UserService";
import UsersView from "./UserTable/UsersView";
import AddContributor from "./UserTable/Actions/AddContributor";
import { mdbContainer, mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "AdminPage",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardBody,
    UsersView,
    AddContributor,
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    try {
      const { data } = await UserService.findAll();
      this.users = data;
      this.$store.dispatch("setAdminViewUsers", data);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
</style>
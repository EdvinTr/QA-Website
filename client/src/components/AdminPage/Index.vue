<template>
  <mdb-container
    v-if="users.length > 0 && $store.state.userPrivilegeLevel == 3"
  >
    <mdb-card>
      <mdb-card-body>
        <mdb-card-title>All Users</mdb-card-title>

        <UsersView :users="users" />
      </mdb-card-body>
      <mdb-container class="table-end">
        <AddContributor />
      </mdb-container>
    </mdb-card>
  </mdb-container>
</template>

<script>
import UserService from "../../services/UserService";
import UsersView from "./UserTable/UsersView";
import AddContributor from "./UserTable/Actions/AddContributor";
import { mdbContainer, mdbCard, mdbCardBody, mdbCardTitle } from "mdbvue";
export default {
  name: "AdminPage",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,

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
.table-end {
  padding-bottom: 10px;
}
</style>
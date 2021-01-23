<template>
  <div>
    <div v-for="user in $store.state.adminViewUsers" :key="user.id">
      <div @click="() => openModal(user)">
        <UserRow :user="user" />
      </div>
    </div>
    <EditUser
      v-if="showEditModal"
      :showEditModal="showEditModal"
      :userData="currentlyViewedUser"
      v-on:close="hideModal"
    />
  </div>
</template>

<script>
import UserRow from "./UserRow";
import EditUser from "./Actions/EditUser";
export default {
  name: "UsersView",
  components: { UserRow, EditUser },
  data() {
    return {
      showEditModal: false,
      currentlyViewedUser: null,
    };
  },
  methods: {
    openModal(user) {
      this.currentlyViewedUser = user;
      this.showEditModal = true;
    },
    hideModal() {
      this.showEditModal = false;
      this.currentlyViewedUser = null;
    },
  },
};
</script>

<style scoped>
</style>
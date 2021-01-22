<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <div @click="() => openModal(user)">
        <UserRow :user="user" />
      </div>
    </div>
    <EditUser
      v-if="currentlyViewedUser"
      :showModal="showModal"
      :userData="currentlyViewedUser"
    />
  </div>
</template>

<script>
import UserRow from "./UserRow";
import EditUser from "./Actions/EditUser";
export default {
  name: "UsersView",
  props: ["users"],
  components: { UserRow, EditUser },
  data() {
    return {
      showModal: false,
      currentlyViewedUser: this.users[0],
    };
  },
  methods: {
    openModal(user) {
      this.currentlyViewedUser = user;
      this.showModal = !this.showModal;
    },
  },
};
</script>

<style scoped>
</style>
<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <div @click="() => openModal(user)">
        <UserRow :user="user" />
      </div>
    </div>
    <EditUser :showModal="showModal" :userData="currentlyViewedUser" />
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
      currentlyViewedUser: null,
    };
  },
  methods: {
    openModal(user) {
      this.currentlyViewedUser = user;
      console.log(this.currentlyViewedUser);

      this.showModal = !this.showModal;
    },
  },
};
</script>

<style scoped>
</style>
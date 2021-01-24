<template>
  <div>
    <mdb-btn
      v-if="isUserBlocked(user) == false"
      color="info"
      class="block-btn"
      @click="() => blockUser(user.id)"
      >Block
    </mdb-btn>

    <mdb-btn
      v-if="isUserBlocked(user) == true"
      color="info"
      class="block-btn"
      @click="() => unblockUser(user.id)"
      >Unblock
    </mdb-btn>
  </div>
</template>

<script>
import UserService from "../../../../services/UserService";
import { mdbBtn } from "mdbvue";
export default {
  name: "BlockUser",
  props: ["user"],
  components: {
    mdbBtn,
  },
  methods: {
    async blockUser(id) {
      try {
        const { data } = await UserService.blockUser(id);
        let currentUsers = this.$store.state.adminViewUsers;

        currentUsers.forEach(function (part, index) {
          if (this[index].id == id) {
            this[index] = data;
          }
        }, currentUsers);

        this.$emit("closeModal");
      } catch (err) {
        console.log(err);
      }
    },
    async unblockUser(id) {
      try {
        const { data } = await UserService.unblockUser(id);
        let currentUsers = this.$store.state.adminViewUsers;

        currentUsers.forEach(function (part, index) {
          if (this[index].id == id) {
            this[index] = data;
          }
        }, currentUsers);
        this.$emit("closeModal");
      } catch (err) {
        console.log(err);
      }
    },
    isUserBlocked(user) {
      return user.privilegeLevel == 0 ? true : false;
    },
  },
};
</script>

<style scoped>
.block-btn {
  background-image: linear-gradient(to right, #003c5fde, #00405dd8);
}
</style>
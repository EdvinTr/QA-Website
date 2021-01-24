<template>
  <mdb-btn
    class="right-aligned-btn btn-danger"
    @click="() => deleteMessage(message.id)"
    >X</mdb-btn
  >
</template>

<script>
import MessageService from "../../services/MessageService";
import { mdbBtn } from "mdbvue";
export default {
  props: ["message"],
  name: "DeleteMessage",
  components: { mdbBtn },
  data() {
    return {};
  },
  methods: {
    async deleteMessage(id) {
      try {
        let answer = confirm("Are you sure you want to delete this message?");
        if (answer) {
          await MessageService.deleteMessage(id);
          this.$emit("deletedMessage", id);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.right-aligned-btn {
  float: right;
  margin-top: 0;
  padding: 0.4rem 0.8rem;
}
</style>
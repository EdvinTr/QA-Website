<template>
  <div
    class="mt-5 button-group"
    v-if="checkUserPresent(answer) || $store.state.userPrivilegeLevel == 3"
  >
    <EditAnswer :answer="answer" />
    <DeleteAnswer :answerId="answer.id" />
  </div>
</template>

<script>
import DeleteAnswer from "./DeleteAnswer";
import EditAnswer from "./EditAnswer";
export default {
  name: "ActionGroup",
  props: ["answer"],
  components: { DeleteAnswer, EditAnswer },
  data() {
    return {};
  },
  methods: {
    checkUserPresent(answer) {
      try {
        if (this.$store.state.user === null) {
          return;
        } else {
          let uId = this.$store.state.user.id;
          return uId == answer.userId ? true : false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.button-group {
  display: flex;
  margin-left: 0;
}
</style>
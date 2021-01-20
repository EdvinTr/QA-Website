<template>
  <div class="buttonGroup">
    <ViewQuestion :questionId="question.id" />
    <Edit
      v-if="checkUserPresent() || $store.state.userPrivilegeLevel == 3"
      :question="question"
    />
    <Delete
      v-if="checkUserPresent() || $store.state.userPrivilegeLevel == 3"
      :question="question"
    />
    <Duplicate :question="question" />
  </div>
</template>

<script>
import Delete from "../Actions/Delete";
import Edit from "../Actions/Edit";
import ViewQuestion from "../Actions/ViewQuestion";
import Duplicate from "../Actions/Duplicate";
export default {
  name: "Actions",
  props: ["question"],
  components: {
    Delete,
    Edit,
    ViewQuestion,
    Duplicate,
  },
  data() {
    return {};
  },
  methods: {
    checkUserPresent() {
      try {
        if (this.$store.state.user === null) {
          return;
        } else {
          let uId = this.$store.state.user.id;
          return uId == this.question.userId ? true : false;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.buttonGroup {
  margin-top: 4rem;
  display: flex;
}
</style>
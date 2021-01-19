<template>
  <div class="buttonGroup">
    <ViewQuestion :questionId="question.id" />
    <Edit :question="question" />
    <Delete :question="question" />
  </div>
</template>

<script>
import Delete from "../Actions/Delete";
import Edit from "../Actions/Edit";
import ViewQuestion from "../Actions/ViewQuestion";
export default {
  name: "Actions",
  props: ["question"],
  components: {
    Delete,
    Edit,
    ViewQuestion,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.buttonGroup {
  margin-top: 4rem;
  display: flex;
}
</style>
<template>
  <div>
    <DeleteAnswer :answerId="answer.id" />
  </div>
</template>

<script>
import DeleteAnswer from "./DeleteAnswer";
export default {
  name: "ActionGroup",
  props: ["answer"],
  components: { DeleteAnswer },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
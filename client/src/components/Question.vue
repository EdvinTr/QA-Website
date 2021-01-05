<template>
  <div>
    <h1>Question Component</h1>
  </div>
</template>

<script>
export default {
  name: "Question",
  components: {},
  async mounted() {
    const questionId = this.$store.currentRoute.params.questionId;
    console.log(questionId);
  },
};
</script>

<style scoped>
</style>
<template>
  <div>
    <div v-for="answer in $store.state.answers" :key="answer.id">
      <Answer :answer="answer" />
    </div>
    <CreateAnswer />
  </div>
</template>

<script>
import Answer from "./Answer";
import CreateAnswer from "./CreateAnswer";
export default {
  name: "AnswerContainer",
  props: ["question"],
  components: {
    Answer,
    CreateAnswer,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
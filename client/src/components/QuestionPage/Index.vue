<template>
  <mdb-container v-if="question">
    <Card :question="question" />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";

import Card from "../QuestionContainer/Card";
export default {
  name: "QuestionPage",
  components: {
    mdbContainer,
    Card,
  },
  data() {
    return {
      question: null,
    };
  },
  mounted() {
    const questionId = this.$store.state.route.params.questionId;
    this.$store.state.questions.forEach((item) => {
      if (item.id == questionId) {
        this.question = item;
      }
    });
  },
};
</script>

<style scoped>
</style>
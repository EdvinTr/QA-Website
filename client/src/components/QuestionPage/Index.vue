<template>
  <mdb-container v-if="question" class="card-animation">
    <Card :question="question" />
    <div v-if="dataReady">
      <AnswerGroup :question="question" />
    </div>
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";

import Card from "../QuestionContainer/Card";
import AnswerGroup from "./Answers/Index";
import AnswerService from "../../services/AnswerService";
export default {
  name: "QuestionPage",
  components: {
    mdbContainer,
    Card,
    AnswerGroup,
  },
  data() {
    return {
      question: null,
      dataReady: false,
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    const questionId = this.$store.state.route.params.questionId;
    this.$store.state.questions.forEach((item) => {
      if (item.id == questionId) {
        this.question = item;
      }
    });
    try {
      const answerData = await AnswerService.findAnswersMappedToQuestionId(
        this.question.id
      );
      this.$store.dispatch("setAnswers", answerData.data);

      this.dataReady = true;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
[v-cloak] {
  display: none;
}
</style>
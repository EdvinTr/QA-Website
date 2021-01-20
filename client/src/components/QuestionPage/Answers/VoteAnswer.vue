<template>
  <div class="scoreButtons">
    <i
      class="fas fa-chevron-up"
      @click="() => upvoteAnswer(answer.id, answer.questionId)"
    ></i>
    <div>{{ answer.score }}</div>
    <i
      class="fas fa-chevron-down"
      @click="() => downvoteAnswer(answer.id, answer.questionId)"
    ></i>
  </div>
</template>

<script>
import AnswerService from "../../../services/AnswerService";
export default {
  props: ["answer"],
  name: "VoteAnswer",
  components: {},
  data() {
    return {};
  },
  methods: {
    async upvoteAnswer(answerId, questionId) {
      try {
        await AnswerService.upvoteAnswer(answerId);
        const { data } = await AnswerService.findAnswersMappedToQuestionId(
          questionId
        );

        this.$store.dispatch("setAnswers", data);
      } catch (err) {
        console.log(err);
      }
    },
    async downvoteAnswer(answerId, questionId) {
      try {
        await AnswerService.downvoteAnswer(answerId);
        const { data } = await AnswerService.findAnswersMappedToQuestionId(
          questionId
        );
        this.$store.dispatch("setAnswers", data);
      } catch (err) {
        console.log(err);
      }
    },
    // TODO Hide upvote and downvote if it is consumers question
  },
};
</script>

<style scoped>
.scoreButtons {
  float: right;
}
.fa-chevron-up {
  cursor: pointer;
}
.fa-chevron-down {
  cursor: pointer;
}
</style>
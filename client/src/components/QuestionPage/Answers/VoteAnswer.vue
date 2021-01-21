<template>
  <div class="scoreButtons" v-if="isConsumersQuestion()">
    <i class="fas fa-chevron-up" @click="() => upvoteAnswer(answer)"></i>
    <div class="score">{{ answer.score }}</div>
    <i class="fas fa-chevron-down" @click="() => downvoteAnswer(answer)"></i>
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
    async upvoteAnswer(answer) {
      try {
        await AnswerService.upvoteAnswer(answer.id);

        let currentAnswers = this.$store.state.answers;
        for (let i in currentAnswers) {
          if (currentAnswers[i].id == answer.id) {
            currentAnswers[i].score++;
            break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async downvoteAnswer(answer) {
      try {
        if (answer.score == 0) {
          return;
        }
        await AnswerService.downvoteAnswer(answer.id);
        let currentAnswers = this.$store.state.answers;
        for (let i in currentAnswers) {
          if (currentAnswers[i].id == answer.id) {
            currentAnswers[i].score--;
            break;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    // TODO Hide upvote and downvote if it is consumers question
    isConsumersQuestion() {
      if (this.$store.state.user === null) {
        return false;
      } else {
        if (this.$store.state.userPrivilegeLevel == 3) {
          return true;
        }
        let userId = this.$store.state.user.id;
        let currentQuestions = this.$store.state.questions;
        let currentQuestionId = this.$store.state.route.params.questionId;
        for (let i in currentQuestions) {
          if (
            currentQuestions[i].userId == userId &&
            currentQuestions[i].id == currentQuestionId
          ) {
            return true;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.scoreButtons {
  float: right;
}
.score {
  text-align: center;
}
.fa-chevron-up {
  cursor: pointer;
}
.fa-chevron-down {
  cursor: pointer;
}
</style>
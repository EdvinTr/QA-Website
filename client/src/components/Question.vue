<template>
  <mdb-container class="mt-4 questionContainer" v-if="isDataFetched">
    <mdb-card>
      <mdb-view hover> </mdb-view>
      <mdb-card-body>
        <mdb-card-title>{{ question.title }}</mdb-card-title>
        <mdb-card-text>{{ question.textContent }}.</mdb-card-text>
        <mdb-card-footer class="text-muted mt-4">
          <div>
            <b>{{ questionCreator.username }}</b>
          </div>
          {{ formatGMTDate(question.createdAt) }}
        </mdb-card-footer>
      </mdb-card-body>
    </mdb-card>
    <!-- REFACTOR THIS -->
    <!-- REFACTOR THIS -->
    <div v-if="areThereAnyAnswers">
      <div v-for="(answer, index) in answers" :key="answer.id">
        <mdb-card class="answer">
          <mdb-view hover> </mdb-view>
          <mdb-card-body>
            <mdb-card-text>{{ answer.textContent }}</mdb-card-text>
            <mdb-card-footer class="text-muted mt-4">
              <div>
                <b>{{ answerUserData[index].username }}</b>
              </div>
              {{ formatGMTDate(answer.createdAt) }}
            </mdb-card-footer>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>
    <AnswerInput />
    <!-- REFACTOR THIS -->
    <!-- REFACTOR THIS -->
  </mdb-container>
</template>

<script>
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import AnswerService from "../services/AnswerService";
import AnswerInput from "../components/AnswerInput";
import {
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbView,
  mdbContainer,
  mdbCardFooter,
} from "mdbvue";
export default {
  name: "Question",
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbView,
    mdbContainer,
    mdbCardFooter,
    AnswerInput,
  },
  data() {
    return {
      isDataFetched: false,
      question: null,
      questionCreator: null,
      areThereAnyAnswers: false,
      answers: [],
      answerUserData: [],
    };
  },
  async created() {
    try {
      // Fetching the specific question by ID
      const questionId = this.$store.state.route.params.questionId;
      const questionData = await QuestionService.findQuestionById(questionId);

      // Fetching the user who created the question
      const questionCreatorId = questionData.data.userId;
      const questionCreatorData = await UserService.findUserById(
        questionCreatorId
      );

      // Fetching answerdata
      const answerData = await AnswerService.findAnswersMappedToQuestionId(
        questionId
      );
      this.answers = answerData.data;

      // Dont render unless there are any answers
      if (this.answers.length > 0) {
        // Find the users who posted the answers
        for (let i = 0; i < this.answers.length; i++) {
          let id = this.answers[i].userId;
          let { data } = await UserService.findUserById(id);
          this.answerUserData = [...this.answerUserData, data];
        }
        this.areThereAnyAnswers = true;
      }

      this.questionCreator = questionCreatorData.data;
      this.question = questionData.data;
      this.isDataFetched = true;
    } catch (err) {
      console.log(err);
    }
    // TODO: Fetch answers for the particular question
  },
  methods: {
    formatGMTDate(date) {
      return QuestionService.splitDate(date);
    },
  },
};
</script>

<style scoped>
.answer {
  margin-top: 20px;
}
.questionContainer {
  margin-bottom: 40rem;
}
</style>
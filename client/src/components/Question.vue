<template>
  <mdb-container class="mt-4 questionContainer">
    <mdb-card>
      <mdb-view hover> </mdb-view>
      <mdb-card-body>
        <mdb-card-title>{{ question.title }}</mdb-card-title>
        <mdb-card-text>{{ question.textContent }}.</mdb-card-text>
        <mdb-btn color="primary">Button</mdb-btn>
        <mdb-card-footer class="text-muted mt-4">
          <div>
            <b>{{ questionCreator.username }}</b>
          </div>
          {{ formatGMTDate(question.createdAt) }}
        </mdb-card-footer>
      </mdb-card-body>
    </mdb-card>

    <div v-for="answer in answers" :key="answer.id">
      <mdb-card class="answer">
        <mdb-view hover> </mdb-view>
        <mdb-card-body>
          <mdb-card-text>{{ answer.text }}</mdb-card-text>
          <mdb-card-footer class="text-muted mt-4">
            <div>
              <b>{{ answer.username }}</b>
            </div>
          </mdb-card-footer>
        </mdb-card-body>
      </mdb-card>
    </div>
  </mdb-container>
</template>

<script>
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import {
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbBtn,
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
    mdbBtn,
    mdbView,
    mdbContainer,
    mdbCardFooter,
  },
  data() {
    return {
      question: null,
      questionCreator: null,
      answers: [
        {
          id: 1,
          text: "Yo, nice question dude",
          username: "Adam",
        },
        {
          id: 2,
          text: "Pretty shitty question ma dude",
          username: "Melvin",
        },
      ],
    };
  },
  async created() {
    // Fetching the specific question by ID
    const questionId = this.$store.state.route.params.questionId;
    const questionData = await QuestionService.findQuestionById(questionId);

    // Fetching the user who created the question
    const userId = questionData.data.userId;
    const userdata = await UserService.findUserById(userId);
    this.questionCreator = userdata.data;
    this.question = questionData.data;
    console.log(this.question);

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
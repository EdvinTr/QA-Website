<template>
  <div v-if="this.questions.length > 0">
    <h3 class="mt-5">Your Questions</h3>
    <div v-for="question in questions" :key="question.id">
      <router-link
        :to="{ name: 'question', params: { questionId: question.id } }"
      >
        <mdb-card class="questionCardContainer">
          <mdb-card-body>
            <mdb-row>
              <mdb-col md="9">{{ question.title }}</mdb-col>
              <mdb-col md="3" class="text-right"
                >Answers: {{ countAnswersToQuestion(question) }}</mdb-col
              >
            </mdb-row>
          </mdb-card-body>
        </mdb-card>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mdbCard, mdbCardBody, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "UserQuestions",
  components: {
    mdbCard,
    mdbCardBody,
    mdbRow,
    mdbCol,
  },
  props: ["questions", "answerCount"],
  data() {
    return {};
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    countAnswersToQuestion(question) {
      for (let i = 0; i < this.answerCount.length; i++) {
        if (question.id == this.answerCount[i].questionId) {
          return this.answerCount[i].count;
        }
      }
    },
  },
};
</script>

<style scoped>
.questionCardContainer {
  margin-top: 1rem;
}
.text-right {
  color: black;
}
</style>
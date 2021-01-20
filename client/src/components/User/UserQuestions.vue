<template>
  <div
    v-if="
      this.questions.length > 0 && this.$store.state.userPrivilegeLevel == 1
    "
  >
    <h3 class="mt-5">Your Questions</h3>
    <div v-for="question in questions" :key="question.id">
      <router-link
        :to="{ name: 'questionpage', params: { questionId: question.id } }"
      >
        <mdb-card class="questionCardContainer">
          <mdb-card-body>
            <mdb-row>
              <mdb-col md="9">{{ question.title }}</mdb-col>
              <mdb-col md="3" class="text-right"
                >Answers: {{ question.answerCount }}</mdb-col
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
  props: ["questions"],
  data() {
    return {};
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {},
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
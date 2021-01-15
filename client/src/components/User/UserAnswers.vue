<template>
  <div
    v-if="this.answers.length > 0 && this.$store.state.userPrivilegeLevel == 2"
  >
    <h3 class="mt-5">Your Answers</h3>
    <div v-for="answer in answers" :key="answer.id">
      <router-link
        :to="{ name: 'question', params: { questionId: answer.questionId } }"
      >
        <mdb-card class="questionCardContainer">
          <mdb-card-body>
            <mdb-row>
              <mdb-col md="9" v-if="answer.textContent.length < 40">{{
                answer.textContent
              }}</mdb-col>
              <mdb-col md="9" v-if="answer.textContent.length >= 40"
                >{{ answer.textContent.slice(0, 60) }}...</mdb-col
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
  props: ["answers"],
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
<template>
  <mdb-container>
    <SearchQuestion />
    <div v-if="this.$store.state.questions.length > 0">
      <div v-for="question in $store.state.questions" :key="question.id">
        <Card :question="question" />
      </div>
    </div>
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";
import SearchQuestion from "./SearchQuestion";
import Card from "../QuestionContainer/Card";
export default {
  components: {
    Card,
    mdbContainer,
    SearchQuestion,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
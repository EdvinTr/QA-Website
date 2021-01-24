<template>
  <mdb-container>
    <SearchQuestion />
    <div v-if="this.$store.state.questions.length > 0" class="card-animation">
      <div v-for="question in $store.state.questions" :key="question.id">
        <Card
          :question="question"
          v-if="$store.state.questions.length > 1"
          class="card-animation"
        />
        <Card :question="question" v-if="$store.state.questions.length == 1" />
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
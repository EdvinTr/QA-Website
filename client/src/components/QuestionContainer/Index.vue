<template>
  <mdb-container>
    <SearchQuestion />
    <div v-if="this.$store.state.questions.length > 0">
      <Card />
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
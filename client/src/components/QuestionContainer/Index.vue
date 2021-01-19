<template>
  <mdb-container>
    <h1>Question Comp</h1>
    <Card />
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";

import Card from "../QuestionContainer/Card";
export default {
  components: {
    Card,
    mdbContainer,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
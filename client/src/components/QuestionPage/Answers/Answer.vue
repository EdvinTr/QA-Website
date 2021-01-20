<template>
  <mdb-card class="mt-3">
    <mdb-view hover> </mdb-view>
    <mdb-card-body>
      <mdb-card-text class="answerText" v-if="answer.textContent.length > 0">{{
        answer.textContent
      }}</mdb-card-text>

      <AnswerFooter :answer="answer" />
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody, mdbCardText, mdbView } from "mdbvue";
import AnswerFooter from "./AnswerFooter";
export default {
  name: "Answer",
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardText,
    mdbView,
    AnswerFooter,
  },
  props: ["answer"],
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
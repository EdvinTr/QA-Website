<template>
  <mdb-card class="mt-3">
    <mdb-view hover> </mdb-view>
    <mdb-card-body>
      <VoteAnswer :answer="answer" />
      <mdb-card-text class="answerText" v-if="answer.textContent.length > 0">{{
        answer.textContent
      }}</mdb-card-text>
      <div>
        <ActionGroup :answer="answer" />
      </div>
      <AnswerFooter :answer="answer" />
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbCard, mdbCardBody, mdbCardText, mdbView } from "mdbvue";
import ActionGroup from "./Actions/ActionGroup";
import AnswerFooter from "./AnswerFooter";
import VoteAnswer from "./VoteAnswer";
export default {
  name: "Answer",
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardText,
    mdbView,

    AnswerFooter,
    ActionGroup,
    VoteAnswer,
  },
  props: ["answer"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.answerText {
  white-space: pre-wrap;
}
</style>
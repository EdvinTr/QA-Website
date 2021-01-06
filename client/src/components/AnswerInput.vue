<template>
  <div>
    <mdb-input
      type="textarea"
      outline
      inputClass="z-depth-1 p-3"
      placeholder="Write an answer..."
    />
    <SuccessButton buttonText="Send" />
  </div>
</template>

<script>
import { mdbInput } from "mdbvue";
import SuccessButton from "../components/SuccessButton";
export default {
  name: "AnswerInput",
  data() {
    return {};
  },
  components: {
    mdbInput,
    SuccessButton,
  },
};
</script>

<style scoped>
.answerInputContainer {
  margin-top: 2rem;
}
</style>

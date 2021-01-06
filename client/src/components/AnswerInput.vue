<template>
  <div v-if="$store.state.user">
    <mdb-input
      type="textarea"
      outline
      inputClass="z-depth-1 p-3"
      placeholder="Write an answer..."
      v-model="textArea"
    />
    <SuccessButton buttonText="Send" :btnClickHandler="this.createAnswer" />
  </div>
</template>

<script>
import { mdbInput } from "mdbvue";
import SuccessButton from "../components/SuccessButton";
import AnswerService from "../services/AnswerService";

export default {
  name: "AnswerInput",

  data() {
    return {
      textArea: "",
    };
  },
  components: {
    mdbInput,
    SuccessButton,
  },
  methods: {
    async createAnswer() {
      const answer = {
        userId: this.$store.state.user.id,
        questionId: this.$store.state.route.params.questionId,
        textContent: this.textArea,
      };

      try {
        const res = await AnswerService.createAnswer(answer);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.answerInputContainer {
  margin-top: 2rem;
}
</style>

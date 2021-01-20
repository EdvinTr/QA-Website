<template>
  <div>
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
import SuccessButton from "../../SuccessButton";
import AnswerService from "../../../services/AnswerService";
export default {
  name: "CreateAnswer",
  components: {
    mdbInput,
    SuccessButton,
  },
  data() {
    return {
      textArea: "",
    };
  },
  methods: {
    async createAnswer() {
      const answer = {
        userId: this.$store.state.user.id,
        questionId: this.$store.state.route.params.questionId,
        textContent: this.textArea,
      };
      try {
        this.textArea = "";
        const res = await AnswerService.createAnswer(answer);
        if (res.data) {
          const newAnswers = [...this.$store.state.answers, res.data];
          this.$store.dispatch("setAnswers", newAnswers);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
</style>
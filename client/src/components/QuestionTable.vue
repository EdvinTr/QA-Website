<template>
  <div>
    <button @click="printQuestions">Click Me</button>
  </div>
</template>

<script>
import QuestionService from "../services/QuestionService";
export default {
  name: "QuestionTable",
  data() {
    return {
      questions: [],
    };
  },

  methods: {
    async mounted() {
      this.questions = await QuestionService.getQuestions();
      console.log(this.questions);
    },
    printQuestions() {
      console.log(this.questions);
    },
  },
};
</script>

<style scoped>
</style>
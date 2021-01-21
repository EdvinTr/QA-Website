<template>
  <mdb-card-footer class="text-muted mt-4">
    <div>
      <b>{{ username }}</b>
    </div>
    {{ formatGMTDate(answer.createdAt) }}
  </mdb-card-footer>
</template>

<script>
import { mdbCardFooter } from "mdbvue";
import QuestionService from "../../../services/QuestionService";
import UserService from "../../../services/UserService";
export default {
  name: "AnswerFooter",
  props: ["answer"],
  components: { mdbCardFooter },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    formatGMTDate(string) {
      return QuestionService.formatDate(string);
    },
  },
  async mounted() {
    try {
      const { data } = await UserService.findUserById(this.answer.userId);
      this.username = data.username;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
</style>
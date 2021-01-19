<template>
  <div v-if="user && question">
    <mdb-card-footer class="text-muted mt-4">
      <div v-if="user.id === question.userId">
        <b>{{ user.username }}</b>
      </div>
      {{ formatGMTDate(question.createdAt) }}
    </mdb-card-footer>
  </div>
</template>

<script>
import { mdbCardFooter } from "mdbvue";
import QuestionService from "../../services/QuestionService";
export default {
  name: "CardFooter",
  props: ["question", "user"],
  components: {
    mdbCardFooter,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.user);
  },
  methods: {
    formatGMTDate(date) {
      return QuestionService.splitDate(date);
    },
  },
};
</script>

<style scoped>
</style>
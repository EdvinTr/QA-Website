<template>
  <div v-if="dataReady">
    <mdb-card-footer class="text-muted mt-4">
      <div>
        <router-link :to="{ path: '/users/' + username }">
          <b class="username-text">{{ username }}</b>
        </router-link>
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
  props: ["question"],
  components: {
    mdbCardFooter,
  },
  data() {
    return {
      username: "",
      dataReady: false,
    };
  },
  mounted() {
    let questionCreators = this.$store.state.questionCreators;
    for (let i = 0; i < questionCreators.length; i++) {
      if (questionCreators[i].id === this.question.userId) {
        this.username = questionCreators[i].username;
        this.dataReady = true;
        break;
      }
    }
  },
  methods: {
    formatGMTDate(date) {
      return QuestionService.formatDate(date);
    },
  },
};
</script>

<style scoped>
.username-text {
  color: #3086e3;
}
</style>
<template>
  <mdb-container>
    <div v-for="(question, index) in questions" :key="question.id">
      <mdb-card class="mt-4">
        <mdb-card-body>
          <mdb-card-title
            >{{ question.title }}
            <aside class="categoryTitle">
              {{ question.category }}
            </aside></mdb-card-title
          >

          <mdb-card-text class="cardText">{{
            question.textContent.slice(0, 200) + "..."
          }}</mdb-card-text>
          <router-link
            :to="{ name: 'question', params: { questionId: question.id } }"
          >
            <SuccessButton buttonText="View"
          /></router-link>
          <mdb-card-footer class="text-muted mt-4">
            <div v-if="users[index].id === question.userId">
              <b>{{ users[index].username }}</b>
            </div>
            {{ formatGMTDate(question.createdAt) }}
          </mdb-card-footer>
        </mdb-card-body>
      </mdb-card>
    </div>
  </mdb-container>
</template>
<script>
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import SuccessButton from "../components/SuccessButton";
import {
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
} from "mdbvue";
export default {
  name: "QuestionTable",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    SuccessButton,
  },
  data() {
    return {
      questions: [],
      users: [],
      formattedDate: "",
    };
  },
  async mounted() {
    const { data } = await QuestionService.getQuestions();
    for (const item of data) {
      const user = await UserService.findUserById(item.userId);
      this.users = [...this.users, user.data];
    }
    this.questions = data;
  },

  methods: {
    formatGMTDate(date) {
      return QuestionService.splitDate(date);
    },
  },
};
</script>

<style scoped>
.categoryTitle {
  display: inline-block;
  background: linear-gradient(to right, #4776e6, #8e54e9);
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  color: white;
  font-size: 12px;
}
.cardText {
  margin-top: 1rem;
}
</style>
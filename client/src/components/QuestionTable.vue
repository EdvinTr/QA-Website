<template>
  <mdb-container>
    <div v-for="(question, index) in questions" :key="question.id">
      <mdb-card class="mt-4">
        <mdb-card-body>
          <mdb-card-title>{{ question.title }}</mdb-card-title>
          <mdb-card-text>{{
            question.textContent.slice(0, 200) + "..."
          }}</mdb-card-text>
          <mdb-btn color="primary" class="btn-answer">Answer</mdb-btn>
          <mdb-card-footer class="text-muted mt-4">
            <div v-if="users[index].id === question.userId">
              {{ users[index].username }}
            </div>
            {{ splitDate(question.createdAt) }}
          </mdb-card-footer>
        </mdb-card-body>
      </mdb-card>
    </div>
  </mdb-container>
</template>
<script>
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import {
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbBtn,
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
    mdbBtn,
    mdbCardFooter,
  },
  data() {
    return {
      questions: [],
      users: [],
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
    splitDate(dateString) {
      const date = dateString.split("T");
      const time = date[1].slice(0, 8);
      const hours = time.slice(0, 2);
      try {
        const parsedTimezone = parseInt(hours) + 1;
        const fullDate =
          date[0] + " " + parsedTimezone.toString() + time.slice(2, 8);
        return fullDate;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
}
</style>
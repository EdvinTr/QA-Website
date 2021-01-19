<template>
  <div v-if="questions.length > 0 && users.length > 0">
    <div v-for="(question, index) in questions" :key="question.id">
      <mdb-card class="mt-4">
        <mdb-card-body>
          <CardHeader
            :title="question.title"
            :category="question.category"
            :duplicate="question.duplicate"
          />
          <CardText :textContent="question.textContent" />
          <Actions :question="question" :function="deleteQuestionById" />
          <CardFooter :question="question" :user="users[index]" />
        </mdb-card-body>
      </mdb-card>
    </div>
  </div>
</template>

<script>
import { mdbCard, mdbCardBody } from "mdbvue";
import CardHeader from "../QuestionContainer/CardHeader";
import CardText from "../QuestionContainer/CardText";
import CardFooter from "../QuestionContainer/CardFooter";
import Actions from "../QuestionContainer/Actions/Index";

export default {
  name: "Card",

  props: ["users", "questions"],
  components: {
    mdbCard,
    mdbCardBody,

    CardFooter,
    CardText,
    CardHeader,
    Actions,
  },
  data() {
    return {};
  },
  methods: {
    async deleteQuestionById(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
</style>
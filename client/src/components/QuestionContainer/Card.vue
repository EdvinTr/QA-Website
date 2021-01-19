<template>
  <div v-if="this.$store.state.questions.length > 0 && users.length > 0">
    <div
      v-for="(question, index) in this.$store.state.questions"
      :key="question.id"
    >
      <mdb-card class="mt-4">
        <mdb-card-body>
          <CardHeader
            :title="question.title"
            :category="question.category"
            :duplicate="question.duplicate"
          />
          <CardText :textContent="question.textContent" />
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
export default {
  name: "Card",

  props: ["users"],
  components: {
    mdbCard,
    mdbCardBody,

    CardFooter,
    CardText,
    CardHeader,
  },
  mounted() {
    console.log(this.users);
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
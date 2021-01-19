<template>
  <div>
    <div v-for="(question, index) in $store.state.questions" :key="question.id">
      <mdb-card class="mt-4">
        <mdb-card-body>
          <CardHeader
            :title="question.title"
            :category="question.category"
            :duplicate="question.duplicate"
          />
          <CardText :textContent="question.textContent" />
          <Actions :question="question" />
          <CardFooter
            :question="question"
            :user="$store.state.questionCreators[index]"
          />
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
  methods: {},
};
</script>

<style scoped>
</style>
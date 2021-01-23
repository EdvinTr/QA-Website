<template>
  <div
    v-if="
      $store.state.questions.length > 0 &&
      $store.state.questionCreators.length > 0
    "
  >
    <mdb-card class="mt-4 card-animation">
      <mdb-card-body>
        <router-link :to="{ path: '/questions/' + question.id }">
          <CardHeader
            :title="question.title"
            :category="question.category"
            :duplicate="question.duplicate"
          />
        </router-link>
        <CardText :textContent="question.textContent" />
        <Actions :question="question" />
        <CardFooter :question="question" />
      </mdb-card-body>
    </mdb-card>
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
  props: ["question"],
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
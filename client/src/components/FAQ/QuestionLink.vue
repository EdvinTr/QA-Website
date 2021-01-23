<template>
  <div v-if="question" class="container">
    <mdb-card class="card-animation mt-2">
      <mdb-card-body class="question-link-card-body">
        <router-link :to="{ path: '/questions/' + question.id }">
          <mdb-card-title class="faq-question-text">{{
            question.title
          }}</mdb-card-title>
        </router-link>
      </mdb-card-body>
    </mdb-card>
  </div>
</template>
<script>
import QuestionService from "../../services/QuestionService";
import { mdbCard, mdbCardTitle, mdbCardBody } from "mdbvue";
export default {
  name: "QuestionLink",
  components: { mdbCard, mdbCardTitle, mdbCardBody },
  props: ["categoryName"],
  data() {
    return {
      question: null,
    };
  },
  async mounted() {
    try {
      const query = {
        searchTerm: this.categoryName,
      };
      const { data } = await QuestionService.searchQuestions(query);
      this.question = data[0];
    } catch (err) {
      console.log(err);
    }
  },
  methods: {},
};
</script>

<style>
.faq-question-text {
  font-size: 16px;
}
.question-link-card-body {
  padding: 1rem 1rem 0.3rem 1rem;
  text-align: left;
}

.card-animation {
  -webkit-animation: fadein 0.4s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.4s; /* Firefox < 16 */
  -ms-animation: fadein 0.4s; /* Internet Explorer */
  -o-animation: fadein 0.4s; /* Opera < 12.1 */
  animation: fadein 0.4s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
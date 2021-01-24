<template>
  <div v-if="question" class="container">
    <router-link :to="{ path: '/questions/' + question.id }">
      <mdb-card class="card-animation mt-2">
        <mdb-card-body class="question-link-card-body hover-card">
          <mdb-card-title class="faq-question-text">{{
            question.title
          }}</mdb-card-title>
        </mdb-card-body>
      </mdb-card>
    </router-link>
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
  transition: all 0.14s ease-in;
}
.hover-card:hover {
  background: rgb(240, 240, 240);
  transform: scale(1.03);
}

.card-animation {
  -webkit-animation: fadein 0.3s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 0.3s; /* Firefox < 16 */
  -ms-animation: fadein 0.3s; /* Internet Explorer */
  -o-animation: fadein 0.3s; /* Opera < 12.1 */
  animation: fadein 0.3s;
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
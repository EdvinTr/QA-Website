<template>
  <mdb-container class="createQuestionContainer card-animation">
    <mdb-card>
      <mdb-card-body>
        <mdb-card-title class="mb-4">Ask a Question</mdb-card-title>
        <form>
          <input
            v-model="title"
            type="text"
            id="titleInput"
            class="form-control"
            autocomplete="off"
            placeholder="Enter a title..."
          />
        </form>
        <div class="multiSelectContainer">
          <multiselect
            v-model="selected"
            :multiple="false"
            :options="options"
            placeholder="Pick a category"
          >
          </multiselect>
        </div>
        <mdb-input
          type="textarea"
          outline
          inputClass="z-depth-1 p-3"
          placeholder="(Optional) Describe your question in more detail..."
          v-model="textArea"
        />
        <div class="error" v-html="error" />

        <SuccessButton
          buttonText="Send"
          :btnClickHandler="this.createQuestion"
        />
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>

<script>
import Multiselect from "vue-multiselect";
import {
  mdbInput,
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
} from "mdbvue";

import SuccessButton from "../components/SuccessButton";
import categories from "../categories";
import QuestionService from "../services/QuestionService";
export default {
  name: "CreateQuestion",
  components: {
    mdbInput,
    mdbContainer,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,

    SuccessButton,
    Multiselect,
  },
  data() {
    return {
      error: null,
      textArea: "",
      selected: null,
      title: "",
      options: [],
    };
  },

  mounted() {
    for (let i in categories) {
      this.options = [...this.options, categories[i].name];
    }
  },

  methods: {
    async createQuestion() {
      if (this.checkFieldsNotEmpty()) {
        // Question Object
        let question = {
          userId: this.$store.state.user.id,
          title: this.firstLetterToUpperCase(this.title),
          textContent: this.firstLetterToUpperCase(this.textArea),
          category: this.selected,
        };

        /* questionCreators is a global state array */
        let questionCreators = this.$store.state.questionCreators;
        let foundUser = false;

        questionCreators.map((user) => {
          if (user.id == this.$store.state.user.id) {
            return (foundUser = true);
          }
        });

        /* If this is true, it means a user, not currently stored as
       a question creator has just submitted a question */
        if (!foundUser) {
          const newUsers = [...questionCreators, this.$store.state.user];
          this.$store.dispatch("setQuestionCreators", newUsers);
        }

        /* Create Question */
        try {
          const returnedQuestion = await QuestionService.createQuestion(
            question
          );

          const newQuestions = [
            ...this.$store.state.questions,
            returnedQuestion.data,
          ];
          // Update VUEX Store with the newly added question and navigate to the question page
          this.$store.dispatch("setQuestions", newQuestions);
          this.$router.push(`/questions/${returnedQuestion.data.id}`);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("Fields not filled in");
      }
    },

    firstLetterToUpperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    checkFieldsNotEmpty() {
      if (this.title == "") {
        this.error = "You must include a title";
        return;
      }
      if (this.selected == null) {
        this.error = "You must pick a category";
        return;
      } else {
        this.error = "";
        return true;
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.createQuestionContainer {
  margin-top: 5rem;
}
.error {
  color: red;
}
.multiSelectContainer {
  margin-top: 1rem;
}
</style>

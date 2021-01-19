<template>
  <mdb-container class="createQuestionContainer">
    <form>
      <label for="defaultFormRegisterNameEx" class="grey-text">Title</label>
      <input
        v-model="title"
        type="text"
        id="defaultFormRegisterNameEx"
        class="form-control"
        autocomplete="off"
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

    <SuccessButton buttonText="Send" :btnClickHandler="this.createQuestion" />
  </mdb-container>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mdbInput, mdbContainer } from "mdbvue";

import SuccessButton from "../components/SuccessButton";
import categories from "../categories";
import QuestionService from "../services/QuestionService";
export default {
  name: "CreateQuestion",
  components: {
    mdbInput,
    mdbContainer,
    SuccessButton,
    Multiselect,
  },
  data() {
    return {
      error: null,
      textArea: "",
      selected: null,
      title: "",
      options: categories,
    };
  },

  methods: {
    async createQuestion() {
      if (this.checkFieldsNotEmpty()) {
        let question = {
          userId: this.$store.state.user.id,
          title: this.firstLetterToUpperCase(this.title),
          textContent: this.firstLetterToUpperCase(this.textArea),
          category: this.selected,
        };

        let foundUser = false;
        console.log("Here");

        for (let i = 0; i < this.$store.state.questionCreators.length; i++) {
          console.log(this.$store.state.questionCreators[i]);

          if (
            this.$store.state.questionCreators[i].id ==
            this.$store.state.user.id
          ) {
            console.log("true");
            foundUser = true;
            break;
          }
        }
        if (!foundUser) {
          console.log("Store doesnt have this user");
          const newUsers = [
            ...this.$store.state.questionCreators,
            this.$store.state.user,
          ];
          this.$store.dispatch("setQuestionCreators", newUsers);
        }

        try {
          const returnedQuestion = await QuestionService.createQuestion(
            question
          );
          const newQuestions = [
            ...this.$store.state.questions,
            returnedQuestion.data,
          ];
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

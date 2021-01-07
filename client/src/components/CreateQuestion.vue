<template>
  <mdb-container class="createQuestionContainer">
    <form>
      <label for="defaultFormRegisterNameEx" class="grey-text">Title</label>
      <input
        v-model="title"
        type="text"
        id="defaultFormRegisterNameEx"
        class="form-control"
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
      placeholder="Ask Something..."
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
        const question = {
          userId: 1,
          title: this.firstLetterToUpperCase(this.title),
          textContent: this.firstLetterToUpperCase(this.textArea),
          category: this.selected,
        };
        console.log(question);
        await QuestionService.createQuestion(question);
        this.$router.push({ name: "home" });
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
      } else if (this.textArea == "") {
        this.error = "You must include some text content";
      } else if (this.selected == null) {
        this.error = "You must pick a category";
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

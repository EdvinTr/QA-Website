<template>
  <div>
    <mdb-modal
      v-if="modal"
      size="lg"
      :show="modal"
      @close="modal = false"
      :data="modalData"
      scrollable
    >
      <mdb-modal-header>
        <mdb-modal-title>{{ modalData.title }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-input
          label="Title"
          outline
          inputClass="z-depth-1 p-3"
          :value="modalData.title"
          @input="updateEditTitle"
        />
        <multiselect v-model="selected" :multiple="false" :options="options">
        </multiselect>

        <mdb-input
          label="Text"
          type="textarea"
          outline
          inputClass="z-depth-1 p-3"
          :value="modalData.textContent"
          :rows="10"
          @input="updateEditTextArea"
        />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="modal = false"
          >Close</mdb-btn
        >
        <mdb-btn
          color="primary"
          size="sm"
          @click="
            () => editQuestion(modalData.id, editTitle, editTextArea, selected)
          "
          >Save changes</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>
    <mdb-btn
      class="btn-edit"
      color="primary"
      @click="() => openEditModal(question)"
      >Edit</mdb-btn
    >
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import categories from "../../../categories";
import QuestionService from "../../../services/QuestionService";
import {
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbInput,
} from "mdbvue";
export default {
  name: "Edit",
  props: ["question"],
  components: {
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    Multiselect,
  },
  data() {
    return {
      modalData: null,
      modal: false,
      options: categories,
      selected: null,
      editTitle: "",
      editTextArea: "",
    };
  },
  methods: {
    updateEditTitle(value) {
      this.editTitle = value;
    },

    updateEditTextArea(value) {
      this.editTextArea = value;
    },

    openEditModal(data) {
      this.editTitle = data.title;
      this.editTextArea = data.textContent;
      this.selected = data.category;
      this.modal = true;
      this.modalData = data;
    },

    async editQuestion(id, title, textContent, category) {
      const question = {
        title,
        textContent,
        category,
      };
      try {
        await QuestionService.editQuestion(id, question);
        const updatedQuestion = await QuestionService.findQuestionById(id);
        const filteredQuestions = this.$store.state.questions.filter(
          (question) => question.id != id
        );
        const newQuestions = [...filteredQuestions, updatedQuestion.data];
        this.$store.dispatch("setQuestions", newQuestions);
      } catch (err) {
        console.log(err);
      }
      this.modal = false;
    },
  },
};
</script>

<style scoped>
</style>
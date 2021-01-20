<template>
  <div>
    <mdb-modal
      v-if="modal"
      :data="modalData"
      size="lg"
      :show="modal"
      @close="modal = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Title goes here</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-input
          label="Edit Answer"
          type="textarea"
          outline
          inputClass="z-depth-1 p-3"
          :rows="numberOfRows"
          :value="modalData.textContent"
          @input="updateAnswerContent"
        />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn
          color="primary"
          size="sm"
          @click="() => onSubmit(modalData.id, modalData.questionId, textArea)"
          >Save changes</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>
    <div>
      <mdb-btn class="ml-0" color="primary" @click="() => openModal(answer)"
        >Edit</mdb-btn
      >
    </div>
  </div>
</template>

<script>
import AnswerService from "../../../../services/AnswerService";
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
  name: "EditAnswer",
  props: ["answer"],
  components: {
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
  },
  data() {
    return {
      textArea: "",
      numberOfRows: 20,
      modal: false,
      modalData: null,
    };
  },
  methods: {
    async onSubmit(id, questionId, text) {
      try {
        const answer = {
          textContent: text,
        };
        await AnswerService.editAnswer(id, answer);

        const { data } = await AnswerService.findOneById(id);
        const newAnswers = this.$store.state.answers.filter(
          (answer) => answer.id != id
        );
        const updatedAnswers = [...newAnswers, data];
        this.$store.dispatch("setAnswers", updatedAnswers);
      } catch (err) {
        console.log(err);
      }
      this.modal = false;
    },
    openModal(data) {
      this.modalData = data;
      this.modal = true;
    },
    updateAnswerContent(value) {
      this.textArea = value;
    },
  },
};
</script>

<style scoped>
</style>

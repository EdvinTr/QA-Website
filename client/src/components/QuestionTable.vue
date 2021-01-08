<template>
  <mdb-container>
    <div>
      <!-- REFACTOR THIS PLEASE, LIKE WTF -->
      <mdb-modal
        v-if="modal"
        size="lg"
        :show="modal"
        @close="modal = false"
        :data="modalData"
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
          <mdb-btn
            color="secondary"
            size="sm"
            @click="() => closeModal(modalData)"
            >Close</mdb-btn
          >
          <!-- TODO  Grab actual edited data-->
          <mdb-btn
            color="primary"
            size="sm"
            @click="
              () =>
                editQuestion(modalData.id, editTitle, editTextArea, selected)
            "
            >Save changes</mdb-btn
          >
        </mdb-modal-footer>
      </mdb-modal>
    </div>

    <!-- REFACTOR THIS PLEASE, LIKE WTF -->

    <div v-for="(question, index) in questions" :key="question.id">
      <mdb-card class="mt-4">
        <mdb-card-body>
          <mdb-card-title
            >{{ question.title }}
            <aside class="categoryTitle">
              {{ question.category }}
            </aside></mdb-card-title
          >

          <mdb-card-text class="cardText">{{
            question.textContent.slice(0, 200) + "..."
          }}</mdb-card-text>
          <div class="buttonGroup">
            <router-link
              :to="{ name: 'question', params: { questionId: question.id } }"
            >
              <SuccessButton
                buttonText="View"
                :btnClickHandler="nothing"
                class="ViewBtn"
            /></router-link>
            <div v-if="$store.state.userPrivilegeLevel == 3">
              <mdb-btn color="primary" @click="() => openModal(question)"
                >Edit</mdb-btn
              >
            </div>
            <div v-if="checkUserPresent(question.userId)">
              <mdb-btn color="primary" @click="() => openModal(question)"
                >Edit</mdb-btn
              >
              <div>
                <mdb-btn
                  color="primary"
                  class="btn-danger"
                  @click="() => deleteQuestionById(question.id)"
                  >Delete</mdb-btn
                >
              </div>
            </div>
          </div>
          <mdb-card-footer class="text-muted mt-4">
            <div v-if="users[index].id === question.userId">
              <b>{{ users[index].username }}</b>
            </div>
            {{ formatGMTDate(question.createdAt) }}
          </mdb-card-footer>
          <div v-if="$store.state.userPrivilegeLevel == 3">
            <mdb-btn
              color="primary"
              class="btn-danger"
              @click="() => deleteQuestionById(question.id)"
              >Admin Delete</mdb-btn
            >
          </div>
        </mdb-card-body>
      </mdb-card>
    </div>
  </mdb-container>
</template>
<script>
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import SuccessButton from "../components/SuccessButton";
import AnswerService from "../services/AnswerService";
import categories from "../categories";
import Multiselect from "vue-multiselect";
import {
  mdbBtn,
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbInput,
} from "mdbvue";
export default {
  name: "QuestionTable",
  components: {
    mdbContainer,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbCardFooter,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbInput,
    SuccessButton,
    Multiselect,
  },
  data() {
    return {
      questions: [],
      users: [],
      formattedDate: "",
      textArea: "",
      modal: false,
      modalData: null,
      options: categories,
      selected: null,
      editTextArea: "",
      editTitle: "",
    };
  },
  async mounted() {
    const { data } = await QuestionService.getQuestions();
    for (const item of data) {
      const user = await UserService.findUserById(item.userId);
      this.users = [...this.users, user.data];
    }
    this.questions = data;
  },

  methods: {
    formatGMTDate(date) {
      return QuestionService.splitDate(date);
    },
    nothing() {
      return 0;
    },
    onShowModal(modal, item) {
      item.show = true;
      this.modal = true;
    },
    async deleteQuestionById(id) {
      try {
        // Delete Question by ID
        await QuestionService.deleteQuestionById(id);
        const { data } = await AnswerService.findAnswersMappedToQuestionId(id);
        // Delete all answers associated with the question ID
        for (let i = 0; i < data.length; i++) {
          await AnswerService.deleteAnswerById(data[i].id);
        }
        this.questions = this.questions.filter((question) => question.id != id);
      } catch (err) {
        console.log(err);
      }
    },
    async editQuestion(id, title, textContent, category) {
      const question = {
        title,
        textContent,
        category,
      };
      try {
        await QuestionService.editQuestion(id, question);
        const { data } = await QuestionService.findQuestionById(id);
        this.questions = this.questions.filter(
          (question) => question.id != data.id
        );
        this.questions = [...this.questions, data];
        this.modal = false;
      } catch (err) {
        console.log(err);
      }
      this.modal = false;
    },
    updateEditTextArea(value) {
      this.editTextArea = value;
    },
    updateEditTitle(value) {
      this.editTitle = value;
    },

    openModal(data) {
      (this.editTitle = data.title), (this.editTextArea = data.textContent);
      this.selected = data.category;
      this.modalData = data;
      this.modal = true;
    },
    closeModal(data) {
      this.editTitle = data.title;
      this.editTextArea = data.textContent;
      this.modal = false;
    },

    checkUserPresent(questionId) {
      try {
        if (this.$store.state.user === null) {
          return;
        } else {
          let uId = this.$store.state.user.id;
          if (uId) {
            return uId == questionId ? true : false;
          } else {
            return false;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.categoryTitle {
  display: inline-block;
  background: linear-gradient(to right, #4776e6, #8e54e9);
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  color: white;
  font-size: 12px;
}
.cardText {
  margin-top: 1rem;
}

.btn-danger {
  margin-left: 0;
}
.ViewBtn {
}
.buttonGroup {
  margin-top: 4rem;
  display: flex;
}
</style>
<template>
  <mdb-container>
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
            <Modal
              buttonText="Edit"
              :id="question.id"
              :title="question.title"
              :textContent="question.textContent"
              :onSave="() => editQuestion(question.id)"
            />

            <div v-if="checkUserPresent(question.userId)">
              <mdb-btn
                color="primary"
                class="btn-danger"
                @click="() => deleteQuestionById(question.id)"
                >Delete</mdb-btn
              >
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
import Modal from "../components/Modal";
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import SuccessButton from "../components/SuccessButton";
import AnswerService from "../services/AnswerService";
import {
  mdbBtn,
  mdbContainer,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbCardFooter,
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
    SuccessButton,
    Modal,
  },
  data() {
    return {
      questions: [],
      users: [],
      formattedDate: "",
      textArea: "",
    };
  },
  async mounted() {
    const { data } = await QuestionService.getQuestions();
    console.log("mounted");
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
    async editQuestion(id) {
      console.log(id);
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
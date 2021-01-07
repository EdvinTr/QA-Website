<template>
  <mdb-container class="mt-4 questionContainer" v-if="isDataFetched">
    <mdb-card>
      <mdb-view hover> </mdb-view>
      <mdb-card-body>
        <mdb-card-title>{{ question.title }}</mdb-card-title>
        <mdb-card-text>{{ question.textContent }}.</mdb-card-text>
        <mdb-card-footer class="text-muted mt-4">
          <div>
            <b>{{ questionCreator.username }}</b>
          </div>
          {{ formatGMTDate(question.createdAt) }}
        </mdb-card-footer>
      </mdb-card-body>
    </mdb-card>
    <!-- REFACTOR THIS -->
    <!-- REFACTOR THIS -->
    <div v-if="areThereAnyAnswers">
      <div v-for="(answer, index) in answers" :key="answer.id">
        <mdb-card class="answer">
          <mdb-view hover> </mdb-view>
          <mdb-card-body>
            <mdb-card-text>{{ answer.textContent }} </mdb-card-text>

            <mdb-card-footer class="text-muted mt-4">
              <div>
                <b>{{ answerUserData[index].username }}</b>
              </div>
              {{ formatGMTDate(answer.createdAt) }}
            </mdb-card-footer>
            <!-- TODO -->
            <!-- v-if="$store.state.userPrivileveLevel === 3" -->
            <!-- <div class="dangerButtonContainer" :id="answer.id">
              <DangerButton
                v-bind:id="answer.id"
                buttonText="Delete"
                :btnClickHandler="click"
              />
            </div> -->
            <div v-if="$store.state.userPrivilegeLevel == 3">
              <mdb-btn
                color="info"
                class="btn-danger"
                @click="() => deleteAnswer(answer.id)"
                >Admin Delete</mdb-btn
              >
            </div>

            <div v-if="checkUserPresent(answer.userId)">
              <mdb-btn
                color="info"
                class="btn-danger"
                @click="() => deleteAnswer(answer.id)"
                >Delete</mdb-btn
              >
            </div>
          </mdb-card-body>
        </mdb-card>
      </div>
    </div>
    <!-- REFACTOR THIS -->
    <!-- REFACTOR THIS -->
    <div v-if="$store.state.userPrivilegeLevel >= 2">
      <mdb-input
        type="textarea"
        outline
        inputClass="z-depth-1 p-3"
        placeholder="Write an answer..."
        v-model="textArea"
      />
      <SuccessButton buttonText="Send" :btnClickHandler="this.createAnswer" />
    </div>
  </mdb-container>
</template>

<script>
import QuestionService from "../services/QuestionService";
import UserService from "../services/UserService";
import AnswerService from "../services/AnswerService";
import SuccessButton from "../components/SuccessButton";
//import DangerButton from "../components/DangerButton";
import {
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbView,
  mdbContainer,
  mdbCardFooter,
  mdbInput,
  mdbBtn,
} from "mdbvue";
export default {
  name: "Question",
  components: {
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbView,
    mdbContainer,
    mdbCardFooter,
    mdbInput,
    SuccessButton,
    mdbBtn,
    //  DangerButton,
  },
  data() {
    return {
      isDataFetched: false,
      question: null,
      questionCreator: null,
      areThereAnyAnswers: false,
      answers: [],
      answerUserData: [],
      textArea: "",
    };
  },
  async beforeCreate() {
    try {
      // Fetching the specific question by ID
      const questionId = this.$store.state.route.params.questionId;
      const questionData = await QuestionService.findQuestionById(questionId);

      // Fetching the user who created the question
      const questionCreatorId = questionData.data.userId;
      const questionCreatorData = await UserService.findUserById(
        questionCreatorId
      );

      // Fetching answerdata
      const answerData = await AnswerService.findAnswersMappedToQuestionId(
        questionId
      );
      this.answers = answerData.data;

      // Dont render unless there are any answers
      if (this.answers.length > 0) {
        this.areThereAnyAnswers = true;
        // Find the users who posted the answers
        for (let i = 0; i < this.answers.length; i++) {
          let id = this.answers[i].userId;
          let { data } = await UserService.findUserById(id);
          this.answerUserData = [...this.answerUserData, data];
        }
      }

      this.questionCreator = questionCreatorData.data;
      this.question = questionData.data;
      this.isDataFetched = true;
    } catch (err) {
      console.log(err);
    }
    // TODO: Fetch answers for the particular question
  },

  methods: {
    formatGMTDate(date) {
      return QuestionService.splitDate(date);
    },
    async createAnswer() {
      const answer = {
        userId: this.$store.state.user.id,
        questionId: this.$store.state.route.params.questionId,
        textContent: this.textArea,
      };
      try {
        const res = await AnswerService.createAnswer(answer);
        if (res.data) {
          try {
            this.textArea = "";
            const questionId = this.$store.state.route.params.questionId;
            const answerData = await AnswerService.findAnswersMappedToQuestionId(
              questionId
            );
            let { data } = await UserService.findUserById(res.data.userId);
            this.answerUserData = [...this.answerUserData, data];
            this.answers = answerData.data;
            this.areThereAnyAnswers = true;
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async deleteAnswer(id) {
      try {
        await AnswerService.deleteAnswerById(id);
        this.answers = this.answers.filter((answer) => answer.id != id);
      } catch (err) {
        console.log(err);
      }
    },
    // async fetchAllData() {
    //   try {
    //     const questionId = this.$store.state.route.params.questionId;
    //     const answerData = await AnswerService.findAnswersMappedToQuestionId(
    //       questionId
    //     );

    //     this.answers = answerData.data;
    //     for (let i = 0; i < this.answers.length; i++) {
    //       let id = this.answers[i].userId;
    //       let { data } = await UserService.findUserById(id);
    //       this.answerUserData = data;
    //     }
    //     if (this.answers.length > 0) {
    //       this.areThereAnyAnswers = true;
    //     } else {
    //       this.areThereAnyAnswers = false;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    checkUserPresent(answersUserId) {
      try {
        if (this.$store.state.user === null) {
          return;
        } else {
          let uId = this.$store.state.user.id;
          if (uId) {
            return uId == answersUserId ? true : false;
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
.answer {
  margin-top: 20px;
}
.questionContainer {
  margin-bottom: 40rem;
}

.dangerButtonContainer {
  margin-top: 1.5rem;
}

.btn-danger {
  background-image: linear-gradient(to right, #ff0000de, #ff1e00d8);
  margin-top: 1rem;
}
</style>
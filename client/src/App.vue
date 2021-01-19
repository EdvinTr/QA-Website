<template>
  <div id="app">
    <Navbar />
    <router-view />
    <div class="spacer"></div>

    <div v-cloak>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QuestionService from "./services/QuestionService";
import UserService from "./services/UserService";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  async beforeCreate() {
    console.log("App Created");
    try {
      let users = [];
      const { data } = await QuestionService.getQuestions();
      let scannedUsersIds = [];
      for (const question of data) {
        if (!scannedUsersIds.includes(question.userId)) {
          const user = await UserService.findUserById(question.userId);
          users = [...users, user.data];
          scannedUsersIds.push(question.userId);
        }
      }
      this.$store.dispatch("setQuestions", data);
      this.$store.dispatch("setQuestionCreators", users);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.btn {
  background-image: linear-gradient(to bottom, #333 0, #111 100%);
}
[v-cloak] {
  display: none;
}

body {
  background-color: rgb(241, 242, 242);
}
.spacer {
  height: 55rem;
}
.text-muted {
  font-size: 13px;
}
.btn-danger {
  background-image: linear-gradient(to right, #ff0000de, #ff1e00d8);
}

.btn-duplicate {
  background-image: #0d47a1 !important;
  background-color: #0d47a1 !important;
}
</style>

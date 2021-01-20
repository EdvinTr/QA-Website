<template>
  <div>
    <mdb-input
      type="text"
      label="Search"
      class="active-pink active-pink-2 mt-5 mb-3"
      v-model="searchField"
      @input="searchTimeOut"
    />
    <div
      v-if="$store.state.questions.length == 0 && searchField != ''"
      class="no-search-results-container"
    >
      <h2 class="nothing-found">Nothing Found</h2>
      <img
        src="https://easydrawingguides.com/wp-content/uploads/2018/10/Crying-Emoji-06.webp"
        alt="sad smiley"
        class="sad-smiley"
      />
    </div>
  </div>
</template>

<script>
import { mdbInput } from "mdbvue";
import UserService from "../../services/UserService";
import QuestionService from "../../services/QuestionService";
export default {
  name: "SearchQuestion",
  components: {
    mdbInput,
  },
  data() {
    return {
      searchField: "",
    };
  },
  methods: {
    searchTimeOut() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      const query = {
        searchTerm: this.searchField,
      };
      this.timer = setTimeout(async () => {
        try {
          const { data } = await QuestionService.searchQuestionsByCategory(
            query
          );
          if (data.length >= 0) {
            let userArray = [];
            let userIds = [];
            for (let i = 0; i < data.length; i++) {
              try {
                if (!userIds.includes(data[i].userId)) {
                  const user = await UserService.findUserById(data[i].userId);
                  userArray = [...userArray, user.data];
                  userIds = [...userIds, data[i].userId];
                }
              } catch (err) {
                console.log(err);
              }
            }
            this.$store.dispatch("setQuestionCreators", userArray);
            this.$store.dispatch("setQuestions", data);
          }
        } catch (err) {
          console.log(err);
        }
      }, 400);
    },
  },
};
</script>

<style scoped>
.no-search-results-container {
  text-align: center;
}
.nothing-found {
  text-align: center;
  padding: 1rem;
}
.sad-smiley {
  max-width: 200px;
  max-height: 200px;
}
</style>
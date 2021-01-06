<template>
  <!-- $store.state.user.privilegeLevel > 1 -->
  <div>
    <mdb-input
      type="textarea"
      outline
      inputClass="z-depth-1 p-3"
      placeholder="Write an answer..."
    />
    <SuccessButton buttonText="Send" :btnClickHandler="this.fetchData" />
  </div>
</template>

<script>
import { mdbInput } from "mdbvue";
import SuccessButton from "../components/SuccessButton";
export default {
  name: "AnswerInput",

  data() {
    return {};
  },
  components: {
    mdbInput,
    SuccessButton,
  },
  methods: {
    fetchData() {
      console.log("Data is fetched XD");
    },
  },
};
</script>

<style scoped>
.answerInputContainer {
  margin-top: 2rem;
}
</style>

<template>
  <!-- v-if="$store.state.userPrivilegeLevel >= 2" -->
  <div>
    <mdb-input
      type="textarea"
      outline
      inputClass="z-depth-1 p-3"
      placeholder="Write an answer..."
      v-model="textArea"
    />
    <SuccessButton buttonText="Send" :btnClickHandler="this.createAnswer" />
  </div>
</template>

<script>
import { mdbInput } from "mdbvue";
import SuccessButton from "../components/SuccessButton";

export default {
  name: "AnswerInput",

  data() {
    return {
      textArea: "",
    };
  },

  components: {
    mdbInput,
    SuccessButton,
  },
  props: {
    createAnswer: {
      type: Function,
    },
  },
  methods: {
    click() {
      this.$emit("clicked", this.textArea);
      console.log("click");
    },
  },
};
</script>

<style scoped>
</style>

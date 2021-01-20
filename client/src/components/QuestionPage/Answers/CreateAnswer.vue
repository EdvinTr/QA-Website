<template>
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
import SuccessButton from "../../SuccessButton";
export default {
  name: "CreateAnswer",
  components: {
    mdbInput,
    SuccessButton,
  },
  data() {
    return {
      textArea: "",
    };
  },
  methods: {
    async createAnswer() {
      console.log("Created answer");
    },
  },
};
</script>

<style scoped>
</style>
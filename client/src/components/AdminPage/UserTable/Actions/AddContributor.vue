<template>
  <div>
    <mdb-btn
      color="primary"
      class="btn-answer"
      size="md"
      @click="addContributor"
      >Add Contributor</mdb-btn
    >
  </div>
</template>

<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "AddContributor",
  components: {
    mdbBtn,
  },
  methods: {
    async addContributor() {
      // TODO, clean this up a lot
      console.log("Clicked");

      // this.clearAddInputFields();
      // try {
      //   await UserService.createContributor(contributor);
      //   const { data } = await UserService.findAll();
      //   this.users = data;
      // } catch (err) {
      //   console.log(err);
      // }

      // this.modalAdd = false;
    },
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
}
</style>
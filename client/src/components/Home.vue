<template>
  <div>
    <h1 class="heading">Home Page</h1>

    <QuestionTable />
  </div>
</template>

<script>
import QuestionTable from "../components/QuestionTable";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    QuestionTable,
  },
  methods: {},
};
</script>

<style scoped>
.heading {
  text-align: center;
  margin-top: 40px;
}
</style>
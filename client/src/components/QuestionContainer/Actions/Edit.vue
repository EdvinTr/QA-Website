<template>
  <mdb-btn class="btn-edit" color="primary">Edit</mdb-btn>
</template>

<!-- Todo OPEN MODAL -->
<script>
import { mdbBtn } from "mdbvue";
export default {
  name: "Edit",
  props: ["question"],
  components: { mdbBtn },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>
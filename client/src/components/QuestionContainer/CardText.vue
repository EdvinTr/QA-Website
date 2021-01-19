<template>
  <div>
    <mdb-card-text class="cardText" v-if="textContent.length < 200">{{
      textContent
    }}</mdb-card-text>

    <mdb-card-text class="cardText" v-if="textContent.length >= 200">{{
      textContent.slice(0, 200) + "..."
    }}</mdb-card-text>
  </div>
</template>

<script>
import { mdbCardText } from "mdbvue";
export default {
  name: "CardText",
  props: ["textContent"],
  components: {
    mdbCardText,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.cardText {
  margin-top: 1rem;
}
</style>
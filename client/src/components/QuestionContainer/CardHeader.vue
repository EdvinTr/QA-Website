<template>
  <div class="titleContainer">
    <mdb-card-title
      >{{ title }}
      <div class="categoryTitle">
        {{ category }}
      </div>
      <div class="isDuplicate" v-if="duplicate == true">Duplicate</div>
    </mdb-card-title>
  </div>
</template>

<script>
import { mdbCardTitle } from "mdbvue";
export default {
  name: "CardHeader",
  props: ["title", "category", "duplicate"],
  components: {
    mdbCardTitle,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.categoryTitle {
  display: inline-block;
  background: linear-gradient(to right, #4776e6, #8e54e9);
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  color: white;
  font-size: 12px;
}
.titleContainer {
  display: flex;
  align-content: space-between;
  align-items: flex-end;
}

.isDuplicate {
  display: inline-block;
  align-content: space-around;
  font-weight: 500;
  font-size: 12px;
  background-color: lightyellow;
  margin-left: 1rem;
  padding: 0.5rem;
}
</style>


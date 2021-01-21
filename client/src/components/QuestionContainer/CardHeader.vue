<template>
  <div class="titleContainer">
    <mdb-card-title>
      <div class="titleText">
        {{ title }}
      </div>
      <div class="category-container">
        <div class="categoryTitle" v-bind:style="bgc">
          {{ category }}
        </div>
      </div>
    </mdb-card-title>
    <div class="isDuplicate" v-if="duplicate == true">Duplicate</div>
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
    return {
      bgc: {
        background: "",
      },
    };
  },
  mounted() {
    this.colorCategory(this.category);
  },

  watch: {
    category: function (newVal) {
      this.colorCategory(newVal);
    },
  },
  methods: {
    colorCategory(category) {
      switch (category) {
        case "Psychology":
          this.bgc.background = "#8e54e9";
          break;

        case "Health & Wellbeing":
          this.bgc.background = "#dd5e89";
          break;

        case "Animals":
          this.bgc.background = "#94716b";
          break;

        case "World":
          this.bgc.background = "#4286f4";
          break;

        case "Gardening":
          this.bgc.background = "#3bb61d";
          break;

        case "Science":
          this.bgc.background = "#4e54c8";
          break;

        case "Music":
          this.bgc.background = "#fc4a1a";
          break;

        case "IT":
          this.bgc.background = "#009fac";
          break;

        case "Sport":
          this.bgc.background = "#000";
          break;

        case "Other":
          this.bgc.background = "#8b8b8b";
          break;
      }
    },
  },
};
</script>

<style scoped>
.categoryTitle {
  display: inline-block;
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  color: white;
  font-size: 12px;
}

.titleText {
  display: inline-block;
  text-align: center;
  margin-right: 0.5rem;
}

.isDuplicate {
  float: right;
  font-weight: 500;
  font-size: 13px;
  background-color: rgba(246, 246, 181, 0.87);
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
}
.category-container {
  float: right;
}
</style>


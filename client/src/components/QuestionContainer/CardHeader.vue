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
import categories from "../../categories";
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
    colorCategory(categoryName) {
      for (let i in categories) {
        if (categories[i].name == categoryName) {
          this.bgc.background = categories[i].background;
        }
      }
    },
  },
};
</script>

<style scoped>
.categoryTitle {
  padding: 0.2rem 0.4rem 0.2rem 0.4rem;
  color: white;
  font-size: 12px;
}

.titleText {
  display: inline-block;
  text-align: left;
  margin-right: 0.5rem;
  color: black;
  transition: all 0.15s ease;
}
.titleText:hover {
  color: rgb(42, 42, 42);
}

.isDuplicate {
  float: right;
  font-weight: 500;
  font-size: 13px;
  background-color: rgba(246, 246, 181, 0.87);
  padding: 0.2rem 0.2rem 0.2rem 0.2rem;
  color: black;
}
.category-container {
  float: right;
}
</style>


<template>
  <mdb-container v-if="categories.length > 0" class="faq-wrapper">
    <mdb-card>
      <mdb-card-body>
        <mdb-card-title>FAQ</mdb-card-title>
        <div v-for="category in categories" :key="category.id">
          <div class="category-row-wrapper">
            <mdb-card class="mt-4 card-animation" v-bind:style="category">
              <mdb-card-body>
                <mdb-row>
                  <mdb-col col="12" class="category-text">{{
                    category.name
                  }}</mdb-col>
                </mdb-row>
              </mdb-card-body>
            </mdb-card>
            <div v-cloak>
              <QuestionLink :categoryName="category.name" />
            </div>
          </div>
        </div>
      </mdb-card-body>
    </mdb-card>
  </mdb-container>
</template>
<script>
import QuestionLink from "./QuestionLink";
import {
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardBody,
  mdbCardTitle,
} from "mdbvue";
import categories from "../../categories";

export default {
  name: "FAQ",
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbCardTitle,
    QuestionLink,
  },
  data() {
    return {
      questions: [],
      categories: categories,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.category-row-wrapper {
  margin-bottom: 3rem;
}
.category-text {
  color: white;
}
[v-cloak] {
  display: none;
}
</style>
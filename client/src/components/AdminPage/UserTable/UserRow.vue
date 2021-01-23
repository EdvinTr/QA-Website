<template>
  <div>
    <mdb-card class="mt-3 user-row">
      <mdb-card-body>
        <mdb-row>
          <mdb-col md="1">{{ user.id }}</mdb-col>
          <mdb-col md="2">{{ user.username }}</mdb-col>
          <mdb-col md="5"></mdb-col>
          <mdb-col md="4" v-if="user.privilegeLevel > 0">{{
            determineRole(user.privilegeLevel)
          }}</mdb-col>
          <mdb-col md="4" class="blocked-text" v-if="user.privilegeLevel == 0"
            >BLOCKED</mdb-col
          >
        </mdb-row>
      </mdb-card-body>
    </mdb-card>
  </div>
</template>

<script>
import QuestionService from "../../../services/QuestionService";
import { mdbRow, mdbCol, mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "UserRow",
  props: ["user"],
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
  },
  data() {
    return {};
  },
  methods: {
    formatGMT(date) {
      return QuestionService.formatDate(date);
    },
    determineRole(n) {
      switch (n) {
        case "0":
          return "BLOCKED";
        case "1":
          return "CONSUMER";
        case "2":
          return "CONTRIBUTOR";
        case "3":
          return "ADMIN";
      }
    },
  },
};
</script>

<style scoped>
.user-row {
  cursor: pointer;
  transition: all 0.14s ease-in;
}

.user-row:hover {
  background: rgb(240, 240, 240);
  transform: scale(1.03);
}
.blocked-text {
  color: red;
}
</style>
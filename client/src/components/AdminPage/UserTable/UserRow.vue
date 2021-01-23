<template>
  <div>
    <mdb-card class="mt-3 user-row">
      <mdb-card-body>
        <mdb-row>
          <mdb-col md="1">{{ user.id }}</mdb-col>
          <mdb-col md="2">{{ user.username }}</mdb-col>
          <mdb-col md="3">{{ user.email }}</mdb-col>
          <mdb-col md="1">{{ user.firstname }}</mdb-col>
          <mdb-col md="2">{{ user.lastname }}</mdb-col>
          <mdb-col md="1">{{ user.privilegeLevel }}</mdb-col>
          <mdb-col md="2">{{ formatGMT(user.createdAt) }}</mdb-col>
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
</style>
<template>
  <mdb-container class="tableContainer">
    <mdb-tbl hover>
      <mdb-tbl-head textWhite class="tableHeader">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Privilege Level</th>
          <th>Registered</th>
          <th>Actions</th>
        </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
        <tr v-for="user in users" :key="user.id">
          <th>{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.privilegeLevel }}</td>
          <td>{{ formatGMTDate(user.createdAt) }}</td>
          <div class="btnGroup">
            <mdb-btn
              color="info"
              class="btn-danger"
              @click="() => deleteUser(user.id)"
              >Delete</mdb-btn
            >

            <mdb-btn color="info" class="btn-success">Edit</mdb-btn>
          </div>
        </tr>
      </mdb-tbl-body>
    </mdb-tbl>
  </mdb-container>
</template>

<script>
import { mdbTbl, mdbTblHead, mdbTblBody, mdbContainer, mdbBtn } from "mdbvue";
import UserService from "../services/UserService";
import QuestionService from "../services/QuestionService";
//import AnswerService from "../services/AnswerService";
export default {
  name: "UserTable",
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbContainer,
    mdbBtn,
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    try {
      const { data } = await UserService.findAll();
      this.users = data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    formatGMTDate(string) {
      return QuestionService.splitDate(string);
    },

    deleteUser(id) {
      try {
        // await UserService.deleteById(id);
        console.log(id);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.tableHeader {
  background-color: #1d1f20 !important;
}
.tableContainer {
  margin-top: 1rem;
  overflow: scroll;
}
.btnGroup {
  display: flex;
}
</style>

<template>
  <!-- IF TIME, REFACTOR BELOW A LOT! -->
  <mdb-container>
    <!----- MODAL EDIT START ----->
    <div>
      <mdb-modal
        v-if="modalEdit"
        :data="modalData"
        size="lg"
        :show="modalEdit"
        @close="modalEdit = false"
      >
        <mdb-modal-header>
          <mdb-modal-title></mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-input
            label="User ID"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.id"
            :disabled="isDisabled"
          />

          <mdb-input
            label="Username"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.username"
            @input="modalEditUpdateUsername"
          />

          <mdb-input
            label="Password"
            type="password"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.password"
            @input="modalEditUpdatePassword"
          />
          <mdb-input
            label="Email"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.email"
            @input="modalEditUpdateEmail"
          />

          <mdb-input
            label="First Name"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.firstname"
            @input="modalEditUpdateFirstName"
          />

          <mdb-input
            label="Last Name"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.lastname"
            @input="modalEditUpdateLastName"
          />
          <mdb-input
            label="Privlilege Level"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.privilegeLevel"
            @input="modalEditUpdatePrivilegeLevel"
          />
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="secondary" size="sm" @click.native="modalEdit = false"
            >Close</mdb-btn
          >
          <mdb-btn color="primary" size="sm" @click="() => saveUser()"
            >Save changes</mdb-btn
          >
        </mdb-modal-footer>
      </mdb-modal>
    </div>
    <!----- END --------->

    <!---- ADD CONTRIBUTOR MODAL START --->
    <div>
      <mdb-modal
        v-if="modalAdd"
        size="lg"
        :show="modalAdd"
        @close="modalAdd = false"
      >
        <mdb-modal-header>
          <mdb-modal-title></mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
          <mdb-input
            label="Username"
            outline
            inputClass="z-depth-1 p-3"
            v-model="modalAddUsername"
          />

          <mdb-input
            label="Password"
            type="password"
            outline
            inputClass="z-depth-1 p-3"
            v-model="modalAddPassword"
          />

          <mdb-input
            label="Email"
            outline
            inputClass="z-depth-1 p-3"
            v-model="modalAddEmail"
          />

          <mdb-input
            label="First Name"
            outline
            inputClass="z-depth-1 p-3"
            v-model="modalAddFirstName"
          />
          <mdb-input
            label="Last Name"
            outline
            inputClass="z-depth-1 p-3"
            v-model="modalAddLastName"
          />
        </mdb-modal-body>
        <mdb-modal-footer>
          <mdb-btn color="secondary" size="sm" @click="closeAddContributorModal"
            >Close</mdb-btn
          >
          <mdb-btn color="primary" size="sm" @click="addContributor"
            >Save changes</mdb-btn
          >
        </mdb-modal-footer>
      </mdb-modal>
    </div>
    <!---------END ------->
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
            <td v-if="user.privilegeLevel > 0">{{ user.privilegeLevel }}</td>
            <td class="userIsBlockedText" v-if="user.privilegeLevel == 0">
              BLOCKED
            </td>
            <td>{{ formatGMTDate(user.createdAt) }}</td>
            <div class="btnGroup">
              <mdb-btn
                color="info"
                class="btn-success"
                @click="() => openEditUserModal(user)"
                >Edit</mdb-btn
              >
              <mdb-btn
                color="info"
                class="block-btn"
                @click="() => blockUser(user.id)"
                >Block</mdb-btn
              >

              <mdb-btn
                color="info"
                class="btn-danger"
                @click="() => deleteUser(user.id)"
                >Delete</mdb-btn
              >
            </div>
          </tr>
        </mdb-tbl-body>
      </mdb-tbl>
    </mdb-container>
    <SuccessButton
      buttonText="Add Contributor"
      :btnClickHandler="openAddContributorModal"
    />
  </mdb-container>
</template>

<script>
import {
  mdbInput,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  mdbContainer,
  mdbBtn,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbModalTitle,
  mdbModalFooter,
} from "mdbvue";
import UserService from "../services/UserService";
import QuestionService from "../services/QuestionService";
import SuccessButton from "../components/SuccessButton";
//import AnswerService from "../services/AnswerService";
export default {
  name: "UserTable",
  components: {
    mdbInput,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
    mdbContainer,
    mdbBtn,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    SuccessButton,
  },
  data() {
    return {
      users: [],
      modalAdd: false,
      modalEdit: false,
      modalData: null,
      modalEditUsername: "",
      modalEditPassword: "",
      modalEditEmail: "",
      modalEditFirstName: "",
      modalEditLastName: "",
      modalEditPrivilegeLevel: "",

      modalAddUsername: "",
      modalAddPassword: "",
      modalAddEmail: "",
      modalAddFirstName: "",
      modalAddLastName: "",
    };
  },
  computed: {
    isDisabled() {
      return true;
    },
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

    async blockUser(id) {
      try {
        await UserService.blockUser(id);
        const { data } = await UserService.findAll();
        this.users = data;
      } catch (err) {
        console.log(err);
      }
    },

    /* ------- EDIT MODAL METHODS START ------- */
    modalEditUpdateUsername(value) {
      this.modalEditUsername = value;
    },

    modalEditUpdatePassword(value) {
      this.modalEditPassword = value;
    },

    modalEditUpdateEmail(value) {
      this.modalEditEmail = value;
    },

    modalEditUpdateFirstName(value) {
      this.modalEditFirstName = value;
    },
    modalEditUpdateLastName(value) {
      this.modalEditLastName = value;
    },

    modalEditUpdatePrivilegeLevel(value) {
      this.modalEditPrivilegeLevel = value;
    },
    async openEditUserModal(data) {
      this.modalData = data;
      this.modalEditUsername = this.modalData.username;
      this.modalEditPassword = this.modalData.password;
      this.modalEditEmail = this.modalData.email;
      this.modalEditFirstName = this.modalData.firstname;
      this.modalEditLastName = this.modalData.lastname;
      this.modalEditPrivilegeLevel = this.modalData.privilegeLevel;
      this.modalEdit = true;
    },

    async saveUser() {
      const user = {
        username: this.modalEditUsername,
        password: this.modalEditPassword,
        email: this.modalEditEmail,
        firstname: this.modalEditFirstName,
        lastname: this.modalEditLastName,
        privilegeLevel: this.modalEditPrivilegeLevel,
      };
      try {
        await UserService.updateUser(this.modalData.id, user);
        const { data } = await UserService.findAll();
        this.users = data;
      } catch (err) {
        console.log(err);
      }

      this.modalEdit = false;
    },
    /* ------- EDIT MODAL METHODS END ------- */

    /* ------ ADD CONTRIBUTOR METHODS START ------ */
    clearAddInputFields() {
      this.modalAddUsername = "";
      this.modalAddPassword = "";
      this.modalAddEmail = "";
      this.modalAddFirstName = "";
      this.modalAddLastName = "";
    },
    async openAddContributorModal() {
      this.modalAdd = true;
    },
    async closeAddContributorModal() {
      this.clearAddInputFields();

      this.modalAdd = false;
    },
    async addContributor() {
      // TODO, clean this up a lot
      const contributor = {
        privilegeLevel: "2",
        username: this.modalAddUsername,
        password: this.modalAddPassword,
        email: this.modalAddEmail,
        firstname: this.modalAddFirstName,
        lastname: this.modalAddLastName,
      };

      this.clearAddInputFields();
      try {
        await UserService.createContributor(contributor);
        const { data } = await UserService.findAll();
        this.users = data;
      } catch (err) {
        console.log(err);
      }

      this.modalAdd = false;
    },
    /* ------ ADD CONTRIBUTOR METHODS END ------ */

    async deleteUser(id) {
      try {
        const answer = confirm("Are you sure you want to delete the user?");
        if (answer) {
          await UserService.deleteById(id);
          this.users = this.users.filter((user) => user.id != id);
        }
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
.block-btn {
  background-image: linear-gradient(to right, #003c5fde, #00405dd8);
}
.userIsBlockedText {
  color: red;
}
</style>

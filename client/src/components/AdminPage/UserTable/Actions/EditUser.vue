<template>
  <div>
    <mdb-modal size="lg" :data="modalData" :show="editModal" @close="hideModal">
      <mdb-modal-header>
        <mdb-modal-title>{{ modalData.username }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div>
          <mdb-input
            label="ID"
            outline
            :disabled="isDisabled"
            inputClass="z-depth-1 p-3"
            :value="modalData.id"
          />
          <mdb-input
            label="Username"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.username"
            @input="updateEditUsername"
          />
          <mdb-input
            label="Email"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.email"
            @input="updateEditEmail"
          />
          <mdb-input
            label="Password"
            type="password"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.password"
            @input="updateEditPassword"
          />
          <mdb-input
            label="First Name"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.firstname"
            @input="updateEditFirstName"
          />
          <mdb-input
            label="Last Name"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.lastname"
            @input="updateEditLastName"
          />
          <mdb-input
            label="Privilege Level"
            outline
            :disabled="isDisabled"
            inputClass="z-depth-1 p-3"
            :value="
              modalData.privilegeLevel == 0
                ? 'BLOCKED'
                : modalData.privilegeLevel
            "
            @input="updateEditPrivilegeLevel"
          />
          <mdb-input
            label="Created At"
            outline
            :disabled="isDisabled"
            inputClass="z-depth-1 p-3"
            :value="formatGMT(modalData.createdAt)"
          />

          <mdb-input
            label="Updated At"
            outline
            :disabled="isDisabled"
            inputClass="z-depth-1 p-3"
            :value="formatGMT(modalData.updatedAt)"
          />
        </div>
      </mdb-modal-body>
      <mdb-container>
        <div class="btn-group">
          <DeleteContributor :user="modalData" v-on:deletedUser="hideModal" />
          <BlockUser :user="modalData" v-on:closeModal="hideModal" />
        </div>
      </mdb-container>
      <mdb-modal-footer>
        <div class="error" v-html="error" />

        <mdb-btn color="secondary" size="sm" @click="hideModal">Close</mdb-btn>
        <mdb-btn color="primary" size="sm" @click="saveUser"
          >Save changes</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import {
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbBtn,
  mdbInput,
  mdbContainer,
} from "mdbvue";
import QuestionService from "../../../../services/QuestionService";
import UserService from "../../../../services/UserService";
import DeleteContributor from "../Actions/DeleteContributor";
import BlockUser from "../Actions/BlockUser";
export default {
  name: "EditUser",
  props: ["showeditModal", "userData"],
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput,
    mdbContainer,

    BlockUser,
    DeleteContributor,
  },
  data() {
    return {
      error: null,
      editModal: this.showeditModal,
      modalData: this.userData,
      editUsername: "",
      editPassword: "",
      editEmail: "",
      editFirstName: "",
      editLastName: "",
      editPrivilegeLevel: "",
      isDisabled: true,
      isPasswordChanged: false,
    };
  },
  watch: {
    showeditModal: function () {
      this.error = "";
      this.modalData = this.userData;
      this.clearInputs();
      this.loadModalVariableData();
      this.editModal = true;
    },
    userData: function (newVal) {
      this.clearInputs();
      this.loadModalVariableData();
      this.modalData = newVal;
    },
  },
  mounted() {
    this.loadModalVariableData();
  },
  methods: {
    async saveUser() {
      let user = null;

      if (this.isPasswordChanged) {
        user = {
          username: this.editUsername,
          password: this.editPassword,
          email: this.editEmail,
          firstname: this.editFirstName,
          lastname: this.editLastName,
          privilegeLevel: this.editPrivilegeLevel,
        };
      } else {
        user = {
          username: this.editUsername,
          email: this.editEmail,
          firstname: this.editFirstName,
          lastname: this.editLastName,
          privilegeLevel: this.editPrivilegeLevel,
        };
      }
      for (const [key, value] of Object.entries(user)) {
        if (value == "" && key) {
          this.error = "All fields must be filled in";
          return;
        }
      }
      console.log(user);
      try {
        const { data } = await UserService.updateUser(this.modalData.id, user);
        let newUsers = this.$store.state.adminViewUsers.filter(
          (user) => user.id != this.modalData.id
        );
        newUsers = [...newUsers, data];
        this.$store.dispatch("setAdminViewUsers", newUsers);
        this.$emit("close");
      } catch (err) {
        console.log(err);
      }
    },
    clearInputs() {
      this.isPasswordChanged = false;
      this.editUsername = "";
      this.editPassword = "";
      this.editEmail = "";
      this.editFirstName = "";
      this.editLastName = "";
      this.editPrivilegeLevel = "";
    },

    loadModalVariableData() {
      this.isPasswordChanged = false;
      this.editUsername = this.modalData.username;
      this.editPassword = this.modalData.password;
      this.editEmail = this.modalData.email;
      this.editFirstName = this.modalData.firstname;
      this.editLastName = this.modalData.lastname;
      this.editPrivilegeLevel = this.modalData.privilegeLevel;
    },

    updateEditUsername(value) {
      this.editUsername = value;
    },

    updateEditPassword(value) {
      this.isPasswordChanged = true;
      this.editPassword = value;
    },

    updateEditEmail(value) {
      this.editEmail = value;
    },

    updateEditFirstName(value) {
      this.editFirstName = value;
    },
    updateEditLastName(value) {
      this.editLastName = value;
    },

    updateEditPrivilegeLevel(value) {
      this.editPrivilegeLevel = value;
    },
    formatGMT(date) {
      return QuestionService.formatDate(date);
    },
    hideModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.btn-group {
  display: flex;
}
</style>
<template>
  <!---- ADD CONTRIBUTOR MODAL START --->
  <div>
    <mdb-modal size="lg" :show="modalAdd" @close="modalAdd = false">
      <mdb-modal-header>
        <mdb-modal-title>Add Contributor</mdb-modal-title>
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
        <div class="error" v-html="error" />
      </mdb-modal-body>

      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click="modalAdd = false"
          >Close</mdb-btn
        >
        <mdb-btn
          color="primary"
          class="btn-answer"
          size="sm"
          @click="addContributor"
          >Add</mdb-btn
        >
      </mdb-modal-footer>
    </mdb-modal>
    <mdb-btn color="primary" class="btn-answer" size="md" @click="openAddModal"
      >Add Contributor</mdb-btn
    >
  </div>
  <!---------END ------->
</template>

<script>
import UserService from "../../../../services/UserService";
import {
  mdbBtn,
  mdbInput,
  mdbModal,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
} from "mdbvue";
export default {
  name: "AddContributor",
  components: {
    mdbInput,
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
  },
  data() {
    return {
      error: null,
      modalAdd: false,
      modalAddUsername: "",
      modalAddPassword: "",
      modalAddEmail: "",
      modalAddFirstName: "",
      modalAddLastName: "",
    };
  },
  methods: {
    clearInputFields() {
      this.modalAddUsername = "";
      this.modalAddPassword = "";
      this.modalAddEmail = "";
      this.modalAddFirstName = "";
      this.modalAddLastName = "";
    },
    openAddModal() {
      this.error = "";
      this.modalAdd = true;
    },
    async addContributor() {
      // TODO, clean this up a lot
      const contributor = {
        privilegeLevel: "2",
        username: this.firstLetterToUpperCase(this.modalAddUsername),
        password: this.modalAddPassword,
        email: this.modalAddEmail,
        firstname: this.firstLetterToUpperCase(this.modalAddFirstName),
        lastname: this.firstLetterToUpperCase(this.modalAddLastName),
      };
      for (const [key, value] of Object.entries(contributor)) {
        if (value == "" && key) {
          this.error = "You must enter values for all fields";
          return;
        }
      }
      try {
        let { data } = await UserService.createContributor(contributor);
        this.clearInputFields();
        const newUsers = [...this.$store.state.adminViewUsers, data];
        this.$store.dispatch("setAdminViewUsers", newUsers);
        this.modalAdd = false;
      } catch (err) {
        console.log(err);
      }
    },
    firstLetterToUpperCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<style scoped>
.btn-answer {
  background-image: linear-gradient(to right, #00b74a, #00b74a);
}
.error {
  color: red;
}
</style>
<template>
  <div>
    <mdb-modal size="lg" :data="modalData" :show="modal" @close="modal = false">
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
          />
          <mdb-input
            label="Email"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.email"
          />
          <mdb-input
            label="Password"
            type="password"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.password"
          />
          <mdb-input
            label="First Name"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.firstname"
          />
          <mdb-input
            label="Last Name"
            outline
            inputClass="z-depth-1 p-3"
            :value="modalData.lastname"
          />
          <mdb-input
            label="Privilege Level"
            outline
            :disabled="isDisabled"
            inputClass="z-depth-1 p-3"
            :value="modalData.privilegeLevel"
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
        <DeleteContributor :user="modalData" v-on:deletedUser="closeModal" />
      </mdb-container>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click="modal = false"
          >Close</mdb-btn
        >
        <mdb-btn color="primary" size="sm">Save changes</mdb-btn>
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
import DeleteContributor from "../Actions/DeleteContributor";
export default {
  name: "EditUser",
  props: ["showModal", "userData"],
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput,
    mdbContainer,

    DeleteContributor,
  },
  data() {
    return {
      modal: this.showModal,
      modalData: this.userData,
      isDisabled: true,
    };
  },
  watch: {
    showModal: function () {
      this.modal = true;
    },
    userData: function (newVal) {
      this.modalData = newVal;
    },
  },
  methods: {
    formatGMT(date) {
      return QuestionService.formatDate(date);
    },
    closeModal() {
      this.modal = false;
    },
  },
};
</script>
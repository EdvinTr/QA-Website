<template>
  <div>
    <mdb-modal
      size="sm"
      :data="currentlyViewedUser"
      :show="modal"
      @close="modal = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Modal title</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>...</mdb-modal-body>
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
} from "mdbvue";
export default {
  name: "EditUser",
  props: ["showModal", "currentlyViewedUser"],
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
  },
  data() {
    return {
      modal: this.showModal,
      modalData: this.currentlyViewedUser,
    };
  },
  watch: {
    showModal: function () {
      this.modal = true;
    },
    currentlyViewedUser: function (newVal) {
      this.modalData = newVal;
      console.log(this.modalData);
    },
  },
  methods: {},
};
</script>
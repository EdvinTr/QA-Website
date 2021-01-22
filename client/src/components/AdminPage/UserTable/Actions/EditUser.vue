<template>
  <div>
    <mdb-modal size="lg" :data="modalData" :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>{{ modalData.username }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div v-for="(name, value) of Object.entries(userData)" :key="value">
          <mdb-input
            :label="name[0]"
            outline
            inputClass="z-depth-1 p-3"
            :value="name[1]"
          />
        </div>
      </mdb-modal-body>
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
} from "mdbvue";
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
  },
  data() {
    return {
      modal: this.showModal,
      modalData: this.userData,
      dataKeys: [],
    };
  },
  mounted() {
    for (const [key, value] of Object.entries(this.modalData)) {
      this.dataKeys = [...this.dataKeys, key];
      console.log(key, value);
    }
    console.log(this.dataKeys);
    for (const item of this.dataKeys) {
      console.log(item);
    }
  },
  watch: {
    showModal: function () {
      this.modal = true;
    },
    userData: function (newVal) {
      this.modalData = newVal;
    },
  },
  methods: {},
};
</script>
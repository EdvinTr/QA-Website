<template>
  <div>
    <mdb-btn color="primary" @click.native="modal = true">{{
      buttonText
    }}</mdb-btn>
    <mdb-modal size="lg" :show="modal" @close="modal = false">
      <mdb-modal-header>
        <mdb-modal-title>{{ id }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-input outline inputClass="z-depth-1 p-3" :value="title" />
        <mdb-input
          type="textarea"
          outline
          inputClass="z-depth-1 p-3"
          :value="textContent"
        />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="modal = false"
          >Close</mdb-btn
        >
        <mdb-btn color="primary" size="sm" @click="onSave"
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
} from "mdbvue";
export default {
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
      modal: false,
    };
  },
  props: {
    buttonText: String,
    title: String,
    textContent: String,
    id: Number,
    onSave: {
      type: Function,
    },
  },
};
</script>

<style scoped>
</style>

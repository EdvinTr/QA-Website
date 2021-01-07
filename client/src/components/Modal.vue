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
        <mdb-input
          outline
          inputClass="z-depth-1 p-3"
          :v-model="titleModel"
          :value="title"
        />
        <multiselect
          v-model="selected"
          :multiple="false"
          :options="options"
          :placeholder="category"
        >
        </multiselect>
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
import Multiselect from "vue-multiselect";
import categories from "../categories";
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
    Multiselect,
  },
  data() {
    return {
      titleModel: "",
      modal: false,
      options: categories,
      selected: null,
    };
  },
  props: {
    buttonText: String,
    title: String,
    textContent: String,
    category: String,
    id: Number,
    onSave: {
      type: Function,
    },
  },
};
</script>

<style scoped>
</style>

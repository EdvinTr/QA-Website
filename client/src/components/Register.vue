<template>
  <div class="formGroup">
    <b-form @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="formData.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="formData.firstname"
          placeholder="Enter First Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Last Name:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="formData.lastname"
          placeholder="Enter Last Name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Username:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="formData.username"
          placeholder="Enter Username"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Password:" label-for="input-7">
        <b-form-input
          id="input-7"
          type="password"
          v-model="formData.password"
          placeholder="Enter Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Admin Level:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="formData.privilegeLevel"
          :options="privilegeLevel"
          required
        ></b-form-select>
      </b-form-group>

      <b-button @click="register" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ formData }}</pre>
    </b-card>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "Register",
  data() {
    return {
      error: null,
      formData: {
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        privilegeLevel: null,
      },
      privilegeLevel: [{ text: "Select One", value: null }, 1, 5, 15],
      show: true,
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register(this.formData);
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        console.log(response.data);
      } catch (error) {
        this.error = error;
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.formData.email = "";
      this.formData.firstname = "";
      this.formData.lastname = "";
      this.formData.username = "";
      this.formData.password = "";
      this.formData.privilegeLevel = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style scoped>
.formGroup {
  margin-top: 30px;
}
</style>
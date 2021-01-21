<template>
  <!-- Card -->
  <div class="container">
    <mdb-card>
      <mdb-card-body>
        <form>
          <p class="h4 text-center py-4">Sign up</p>
          <div class="grey-text">
            <mdb-input
              label="First name"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              v-model="formData.firstname"
            />
            <mdb-input
              label="Last name"
              icon="user"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              v-model="formData.lastname"
            />
            <mdb-input
              label="Your email"
              icon="envelope"
              group
              type="email"
              validate
              error="wrong"
              success="right"
              required
            />
            <mdb-input
              label="Confirm your email"
              icon="exclamation-triangle"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              v-model="formData.email"
            />
            <mdb-input
              label="Your username"
              icon="file-signature"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              v-model="formData.username"
            />
            <mdb-input
              label="Your password"
              icon="lock"
              group
              type="password"
              validate
              required
              v-model="formData.password"
            />
          </div>
          <div class="text-center py-4 mt-3">
            <div class="error" v-html="error" />
            <mdb-btn color="btn btn-indigo" @click="register">Register</mdb-btn>
          </div>
        </form>
      </mdb-card-body>
    </mdb-card>
  </div>
  <!-- Card -->
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import { mdbInput, mdbBtn, mdbCard, mdbCardBody } from "mdbvue";
export default {
  name: "Basic",
  components: {
    mdbInput,
    mdbBtn,
    mdbCard,
    mdbCardBody,
  },
  data() {
    return {
      error: null,
      formData: {
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const res = await AuthenticationService.register(this.formData);
        this.$store.dispatch("setToken", res.data.token);
        this.$store.dispatch("setUser", res.data.user);
        this.$store.dispatch("setPrivilegeLevel", res.data.user);
        this.$router.push({ name: "questions" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
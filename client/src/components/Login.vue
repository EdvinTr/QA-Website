<template>
  <!-- Default form login -->
  <div class="container signInContainer card-animation">
    <form class="form-group">
      <p class="h4 text-center mb-4">Sign in</p>
      <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
      <input
        type="email"
        id="defaultFormLoginEmailEx"
        class="form-control"
        v-model="credentials.email"
      />
      <br />
      <label for="defaultFormLoginPasswordEx" class="grey-text"
        >Your password
      </label>
      <input
        type="password"
        id="defaultFormLoginPasswordEx"
        class="form-control"
        v-model="credentials.password"
      />
      <router-link to="/register">
        <div class="dontHaveAccountText">Don't have an account? Click here</div>
      </router-link>
      <div class="text-center mt-4">
        <div class="error" v-html="error" />
        <button class="btn btn-indigo" @click="login">Login</button>
      </div>
    </form>
  </div>
  <!-- Default form login -->
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },

      error: null,
    };
  },
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const res = await AuthenticationService.login({
          email: this.credentials.email,
          password: this.credentials.password,
        });
        // TODO remove user password from backend
        this.$store.dispatch("setToken", res.data.token);
        this.$store.dispatch("setUser", res.data.user);
        this.$store.dispatch("setPrivilegeLevel", res.data.user);
        this.$router.push({ name: "questions" });
        //this.$router.push({ name: "createquestion" });
        //this.$router.push({ name: "home" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  width: 50%;
  margin: 50px auto;
}

.error {
  color: red;
}
.signInContainer {
  margin-bottom: 50rem;
}
.dontHaveAccountText {
  margin-top: 1rem;
  cursor: pointer;
  font-size: 14px;
}
@media only screen and (max-width: 600px) {
  .form-group {
    width: 80%;
  }
}
</style>
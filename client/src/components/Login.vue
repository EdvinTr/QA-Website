<template>
  <!-- Default form login -->
  <form class="form-group">
    <p class="h4 text-center mb-4">Sign in</p>
    <label for="defaultFormLoginEmailEx" class="grey-text">Your email</label>
    <input type="email" id="defaultFormLoginEmailEx" class="form-control" />
    <br />
    <label for="defaultFormLoginPasswordEx" class="grey-text"
      >Your password</label
    >
    <input
      type="password"
      id="defaultFormLoginPasswordEx"
      class="form-control"
    />
    <div class="text-center mt-4">
      <button class="btn btn-indigo" type="submit">Login</button>
    </div>
  </form>
  <!-- Default form login -->
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.form-group {
  width: 50%;
  margin: 50px auto;
}
</style>
<template>
  <mdb-navbar expand="large" dark>
    <router-link to="/">
      <div class="brand">
        <mdb-navbar-brand>{{ pageTitle }}</mdb-navbar-brand>
      </div>
    </router-link>
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <router-link :to="{ name: 'createquestion' }">
          <mdb-nav-item id="donationButtonId" class="donationButton"
            ><span class="donationText">Ask A Question</span></mdb-nav-item
          >
        </router-link>

        <router-link to="/register">
          <mdb-nav-item>{{
            $store.state.isUserLoggedIn ? "" : "Membership"
          }}</mdb-nav-item>
        </router-link>

        <mdb-nav-item v-if="$store.state.isUserLoggedIn">
          <mdb-icon far icon="envelope" />
        </mdb-nav-item>

        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>{{
            $store.state.isUserLoggedIn ? $store.state.user.username : "User"
          }}</mdb-dropdown-toggle>

          <mdb-dropdown-menu>
            <div v-if="!$store.state.isUserLoggedIn">
              <router-link to="/login" class="dropdown-item"
                >Login
              </router-link>
              <router-link to="/register" class="dropdown-item"
                >Register
              </router-link>
            </div>
            <div v-if="$store.state.userPrivilegeLevel == 3">
              <router-link to="/users" class="dropdown-item"
                >Manage Users</router-link
              >
            </div>
            <div v-if="$store.state.isUserLoggedIn">
              <router-link
                :to="{ path: '/users/' + $store.state.user.username }"
                class="dropdown-item"
                >My Page
              </router-link>
              <mdb-dropdown-item @click="logout">Logout</mdb-dropdown-item>
            </div>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem,
  mdbIcon,
} from "mdbvue";
export default {
  name: "NavbarPage",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbIcon,
  },
  data() {
    return {
      pageTitle: "QA Engine",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$store.dispatch("setPrivilegeLevel", 0);

      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.brand {
  cursor: pointer;
}

.navbar-expand-lg {
  background-color: #1d1f20;
  color: white;
  font-size: 12px;
}

mdb-navbar-toggler {
  color: white;
}
.navbar-link {
  color: #000;
}
.donationButton {
  background-color: #ffe500;
  color: #000;
  font-weight: 700;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.donationText {
  color: black;
}

@media (max-width: 764px) {
  .donationButton {
    margin: 0.6rem 0 0.6rem 0;
    text-align: center;
    max-width: 25%;
  }
}
</style>
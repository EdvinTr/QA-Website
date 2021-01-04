<template>
  <mdb-navbar expand="large" dark>
    <mdb-container>
      <div class="brand" @click="navigateTo({ name: 'home' })">
        <mdb-navbar-brand> QA Engine </mdb-navbar-brand>
      </div>
      <mdb-navbar-toggler>
        <mdb-navbar-nav right>
          <mdb-nav-item
            id="donationButtonId"
            class="donationButton"
            @click="navigateTo({ name: 'login' })"
            ><span class="donationText">Support QA Engine</span></mdb-nav-item
          >

          <mdb-nav-item @click="navigateTo({ name: 'register' })">{{
            $store.state.isUserLoggedIn ? "" : "Membership"
          }}</mdb-nav-item>

          <mdb-nav-item v-if="$store.state.isUserLoggedIn">
            <mdb-icon far icon="envelope" />
          </mdb-nav-item>

          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>{{
              $store.state.isUserLoggedIn ? $store.state.user.firstname : "User"
            }}</mdb-dropdown-toggle>

            <mdb-dropdown-menu>
              <mdb-dropdown-item
                v-if="!$store.state.isUserLoggedIn"
                @click="navigateTo({ name: 'login' })"
                >Login</mdb-dropdown-item
              >
              <mdb-dropdown-item
                v-if="!$store.state.isUserLoggedIn"
                @click="navigateTo({ name: 'register' })"
                >Register</mdb-dropdown-item
              >
              <mdb-dropdown-item
                v-if="$store.state.isUserLoggedIn"
                @click="logout"
                >Logout</mdb-dropdown-item
              >
              <mdb-dropdown-item v-if="$store.state.isUserLoggedIn"
                >My Page</mdb-dropdown-item
              >
            </mdb-dropdown-menu>
          </mdb-dropdown>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-container>
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
  mdbContainer,
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
    mdbContainer,
    mdbIcon,
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);

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
  border-radius: 1000px;
  font-weight: 700;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.donationText {
  color: black;
}

@media (max-width: 1024px) {
  .donationButton {
    display: none;
  }
}
</style>
<template>
  <div class="navOuterColor">
    <mdb-container>
      <mdb-navbar expand="large" dark>
        <router-link to="/">
          <div class="brand">
            <mdb-navbar-brand>{{ pageTitle }}</mdb-navbar-brand>
          </div>
        </router-link>
        <mdb-navbar-toggler>
          <mdb-navbar-nav right>
            <div
              v-if="
                $store.state.userPrivilegeLevel == 1 ||
                $store.state.isUserLoggedIn == false
              "
            >
              <router-link :to="{ name: 'createquestion' }">
                <mdb-nav-item class="ask-a-question"
                  ><div class="ask-a-question-text">
                    Ask A Question
                  </div></mdb-nav-item
                >
              </router-link>
            </div>
            <router-link to="/faq">
              <mdb-nav-item>
                <div class="faq-text">
                  {{ "FAQ" }}
                </div>
              </mdb-nav-item>
            </router-link>
            <div v-if="!$store.state.isUserLoggedIn">
              <router-link to="/register">
                <mdb-nav-item>{{ "Membership" }}</mdb-nav-item>
              </router-link>
            </div>

            <mdb-nav-item v-if="$store.state.isUserLoggedIn">
              <mdb-icon far icon="envelope" />
            </mdb-nav-item>

            <mdb-dropdown tag="li" class="nav-item">
              <mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed>{{
                $store.state.isUserLoggedIn
                  ? $store.state.user.username
                  : "User"
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
    </mdb-container>
  </div>
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
  mdbContainer,
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
    mdbContainer,
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
.ask-a-question {
  background-color: #ffe500;
  font-weight: 700;
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
}
.ask-a-question-text {
  color: black;
}

.navbar {
  -webkit-box-shadow: 0px !important;
  box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.16), 0 0px 0px 0 rgba(0, 0, 0, 0.12);
  padding: 0.5rem 0rem;
}

.navOuterColor {
  background-color: #1d1f20;
}

.faq-text {
  margin-left: 5px;
}

@media (max-width: 991px) {
  .ask-a-question {
    margin: 0.6rem 0 0 0;
    text-align: left;
    max-width: 6rem;
    display: block;
  }
}
</style>
<template>
  <mdb-navbar color="indigo" dark>
    <div class="brand" @click="navigateTo({ name: 'home' })">
      <mdb-navbar-brand> QA Engine </mdb-navbar-brand>
    </div>
    <mdb-navbar-toggler>
      <form>
        <mdb-input
          type="text"
          class="text-white"
          placeholder="Search"
          aria-label="Search"
          label
          navInput
          waves
          waves-fixed
        />
      </form>
      <mdb-navbar-nav right>
        <mdb-nav-item href="#" active>Home</mdb-nav-item>
        <mdb-nav-item href="#">Features</mdb-nav-item>
        <mdb-nav-item @click="navigateTo({ name: 'login' })"
          >Login</mdb-nav-item
        >
        <mdb-dropdown tag="li" class="nav-item">
          <mdb-dropdown-toggle
            tag="a"
            navLink
            color="indigo"
            slot="toggle"
            waves-fixed
            >Dropdown</mdb-dropdown-toggle
          >

          <mdb-dropdown-menu>
            <mdb-dropdown-item>Action</mdb-dropdown-item>
            <mdb-dropdown-item>Another action</mdb-dropdown-item>
            <mdb-dropdown-item>Something else here</mdb-dropdown-item>
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
  mdbInput,
  mdbDropdownItem,
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
    mdbInput,
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.brand {
  cursor: pointer;
}
</style>
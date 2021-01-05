<template>
  <!-- Footer -->
  <div class="footer-container">
    <mdb-footer color="grey darken-4" class="font-small pt-4 mt-4">
      <mdb-container class="text-left">
        <mdb-row>
          <mdb-col sm="6">
            <p>
              <strong>QA Engine Internation Inc</strong>
              <br />
              1461 First Avenue, New York, NY 10075-2201, USA
            </p>
          </mdb-col>
          <mdb-col sm="6">
            <ul>
              <div v-for="item in footerItems" :key="item">
                <li class="list-unstyled">{{ item }}</li>
              </div>
            </ul>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </mdb-footer>
  </div>
  <!-- Footer -->
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "FooterPage",
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
  data() {
    return {
      footerItems: ["FAQ", "Rules", "Integrity", "Moderators"],
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>

<style scoped>
.font-small {
  background-color: #1d1f20 !important;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  /* position: absolute;
  bottom: 0;
  width: 100%; */
}
.copyrightText {
  cursor: pointer;
}

.footer-container {
  margin-top: 400px;
}

@media (max-width: 1024px) {
}
</style>
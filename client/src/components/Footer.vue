<template>
  <!-- Footer -->
  <div class="footer-container">
    <mdb-footer class="font-small pt-4 mt-4">
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
footer {
  background-color: #111;
  font-size: 11px;
  position: absolute;
  width: 100%;
  bottom: 0;
}
.copyrightText {
  cursor: pointer;
}

@media (max-width: 1024px) {
  footer {
    bottom: -300px;
  }
}
</style>
<template>
  <mdb-card class="profileCardContainer">
    <mdb-row>
      <mdb-col md="3" class="mr-0">
        <img
          src="https://mdbootstrap.com/img/Others/documentation/img%20(75)-mini.jpg"
          alt="thumbnail"
          class="img-thumbnail"
        />
      </mdb-col>
      <mdb-row class="mt-4">
        <mdb-col md="6" class="name"
          >{{ user.firstname }} {{ user.lastname }}</mdb-col
        >
        <mdb-col md="9">{{ user.email }}</mdb-col>
      </mdb-row>
    </mdb-row>
  </mdb-card>
</template>

<script>
import { mdbRow, mdbCol, mdbCard } from "mdbvue";
export default {
  props: ["user"],
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
  },
};
</script>

<style scoped>
.profileCardContainer {
  margin-top: 0.7rem;
  padding: 2rem;
}
.img-thumbnail {
  max-width: 150px;
  height: 150px;
  border-radius: 1000rem;
  cursor: pointer;
}
.name {
  font-weight: 700;
}
</style>
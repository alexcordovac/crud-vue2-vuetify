<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/estudiantelogo.png')"
          class="my-3"
          contain
          height="300"
        />
      </v-col>
      <v-col class="">
        <h1 class="display-2 font-weight-bold">Sistema Web REST</h1>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="pa-0">
        <h1 class="display-5 font-weight-bold mb-1">CRUD Estudiantes</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Inicio",
};
</script>

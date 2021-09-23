<template>
  <v-container style="width: 600px !important">
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Añadir estudiante</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <form v-on:submit.prevent="guardarEstudiante()">
          <h3 class="mb-5">Datos generales</h3>

          <v-text-field
            v-model="estudiante.nombre"
            label="Nombre"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="estudiante.apellidos"
            label="Apellidos"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="estudiante.matricula"
            label="Matricula"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="estudiante.edad"
            label="Edad"
            type="number"
            outlined
            required
          >
          </v-text-field>

          <v-text-field
            v-model="estudiante.carrera"
            label="Carrera"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="estudiante.cicloActual"
            label="Ciclo"
            type="number"
            outlined
            required
          ></v-text-field>

          <h3 class="mb-5">Calificaciones</h3>

          <v-text-field
            v-model="estudiante.idCalificacion.parcial1"
            label="Parcial 1"
            type="number"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="estudiante.idCalificacion.parcial2"
            label="Parcial 2"
            type="number"
            outlined
            required
          ></v-text-field>

          <v-text-field
            v-model="estudiante.idCalificacion.parcial3"
            label="Parcial 3"
            type="number"
            outlined
            required
          ></v-text-field>

          <v-card-actions>
            <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>
            <v-btn
              :to="{ path: '/estudiantes' }"
              color="error"
              class="mr-4"
              type="submit"
              >Salir</v-btn
            >
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EstudianteServicio from "../services/EstudianteServicio";

export default {
  name: "Agregar",

  data() {
    return {
      estudiante: {
        idEstudiante: null,
        matricula: "",
        nombre: "",
        apellidos: "",
        edad: null,
        carrera: "",
        cicloActual: null,
        idCalificacion: {
          idCalificacion: null,
          parcial1: null,
          parcial2: null,
          parcial3: null,
        },
      },
    };
  },
  methods: {


    guardarEstudiante() {
      let router = this.$router;

      //Agregamos el estudiante
      EstudianteServicio.agregar(this.estudiante)
        .then(() => {
          setTimeout(() => {
            router.push({ name: "listarEstudiante" });
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
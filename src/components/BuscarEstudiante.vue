<template>
  <v-container>
    <!--Título-->
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-2">
          Buscar estudiantes por <strong>matricula</strong>
        </h2>
      </v-col>
    </v-row>

    <!--Campo de busqueda y botón-->
    <v-row justify="center" align="center" class="text-center">
      <v-col class="col-6">
        <div>
          <v-text-field
            v-model="matricula"
            label="Matricula"
            :rules="reglas"
            hide-details="auto"
          ></v-text-field>
        </div>
      </v-col>
      <v-col class="col-2">
        <v-btn
          @click="buscarMatricula()"
          depressed
          block
          color="teal darken-4"
          class="white--text"
          >Buscar <v-icon right dark>mdi-card-search</v-icon></v-btn
        >
      </v-col>
    </v-row>

    <!--Tabla-->
    <v-row class="mt-15">
      <v-col>
        <v-simple-table fixed-header class="text-center elevation-1">
          <template v-slot:default>
            <thead color="primary">
              <tr>
                <th rowspan="2" class="text-center white--text">ID</th>
                <th rowspan="2" class="text-center white--text">Matricula</th>
                <th rowspan="2" class="text-center white--text">Nombre</th>
                <th rowspan="2" class="text-center white--text">Apellidos</th>
                <th rowspan="2" class="text-center white--text">Edad</th>
                <th rowspan="2" class="text-center white--text">Carrera</th>
                <th rowspan="2" class="text-center white--text">Ciclo</th>
                <th colspan="4" class="text-center white--text my-2">
                  Calificaciones
                </th>
              </tr>
              <tr>
                <th class="white--text">P1</th>
                <th class="white--text">P2</th>
                <th class="white--text">P3</th>
                <th class="white--text">Promedio</th>
              </tr>
            </thead>
            <tbody v-if="estudiante">
              <tr>
                <td>{{ estudiante.idEstudiante }}</td>
                <td>{{ estudiante.matricula }}</td>
                <td>{{ estudiante.nombre }}</td>
                <td>{{ estudiante.apellidos }}</td>
                <td>{{ estudiante.edad }}</td>
                <td>{{ estudiante.carrera }}</td>
                <td>{{ estudiante.cicloActual }}</td>
                <td>{{ estudiante.idCalificacion.parcial1 }}</td>
                <td>{{ estudiante.idCalificacion.parcial2 }}</td>
                <td>{{ estudiante.idCalificacion.parcial3 }}</td>
                <td>{{ promedio }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <td>{{ "Sin resultados" }}</td>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EstudianteServicio from "../services/EstudianteServicio";

export default {
  name: "BuscarEstudiante",

  mounted() {},

  data: () => ({
    reglas: [(value) => !!value || "Requerido."],
    estudiante: null,
    matricula: "",
  }),

  methods: {
    buscarMatricula() {
      if (this.estudiante != null) {
        this.estudiante = null;
      }
      EstudianteServicio.buscarMatricula(this.matricula)
        .then((r) => {
          this.estudiante = r.data;
          this.matricula = "";
        })
        .catch( e => {
          console.log(e);
        });
    },
  },

  computed: {
    promedio: function () {
      let p = Number(
        (this.estudiante.parcial1 +
          this.estudiante.parcial2 +
          this.estudiante.parcial3) /
          3
      ).toFixed(2);
      return isNaN(p) ? 0 : p;
    },
  },
};
</script>
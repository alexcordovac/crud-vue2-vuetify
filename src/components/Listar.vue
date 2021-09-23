<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h2 class="display-2 font-weight-bold mb-2">Lista de estudiantes</h2>
      </v-col>
    </v-row>

    <!--Boton agregar-->
    <v-row>
      <v-col class="mb-1">
        <v-btn
          :to="{name: 'agregarEstudiante'}"
          class="mx-2"
          dark
          color="orange"
        >
          <v-icon dark>mdi-plus</v-icon>Agregar</v-btn>
      </v-col>
    </v-row>

    <!--data table-->
    <v-row align="center" class="list px-3 mx-auto">
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Base de datos estudiantes</v-card-title>

          <v-text-field
            v-model="busqueda"
            label="Buscar (por nombre, matricula, apellidos, carrera)"
            class="mx-4"
          ></v-text-field>

          <v-data-table
            :headers="encabezados"
            :items="estudiantes"
            item-key="idEstudiante"
            no-results-text = 'Sin resultados :('
            :search="busqueda"
            :hide-default-footer="false"
            :footer-props="{
              'items-per-page-text':'Estudiantes por página',
              'items-per-page-all-text': 'Todos',
            }"
          >
          <template v-slot:[`item.acciones`]="{ item }">
            <v-icon medium class="mr-2" @click="editarEstudiante(item.idEstudiante)">mdi-pencil</v-icon>
            <v-icon medium @click.stop="eliminarDialog=true" @click="estudianteTmp = item">mdi-delete</v-icon>
          </template>

          <template v-slot:footer.page-text="items"> 
            {{ items.pageStart }}-{{ items.pageStop }} de {{ items.itemsLength }} 
          </template>
          </v-data-table>

          <v-card-actions v-if="estudiantes.length > 0">
            <v-btn small color="error"> Eliminar todo </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!--Eliminar estudiante (dialogo)-->
    <v-dialog  v-model="eliminarDialog" max-width="500">
      <v-card class="text-center d-flex flex-column" height="100%">

        <v-card-title class="title grey lighten-2"
          >¿Desea eliminar el registro?</v-card-title>

          <v-card-title class="subtitle-1 lighten-2"
          >{{ estudianteTmp.matricula }} - {{ estudianteTmp.nombre+ ' '+ estudianteTmp.apellidos }}</v-card-title
        >
          

        <v-card-actions class="justify-end my-2">
          <v-btn @click="eliminarDialog = false">Cancelar</v-btn>
          <v-btn @click="eliminarEstudiante(estudianteTmp.idEstudiante)" color="error">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import EstudianteServicio from "../services/EstudianteServicio";

export default {
  name: "Listar",
  mounted() {
    this.obtenerEstudiantes();
  },
  data() {
    return {
      eliminarDialog: false,
      estudianteTmp: "",
      estudiantes: [],
      busqueda: "",
      encabezados: [
        { text: "Nombre", sortable: true, value: "nombre", filterable: true },
        { text: "Matricula", value: "matricula", sortable: true, filterable: true },
        { text: "Apellidos", value: "apellidos", sortable: true, filterable: true },
        { text: "Edad", value: "edad", sortable: true, filterable: false },
        { text: "Carrera", value: "carrera", sortable: true, filterable: true},
        { text: "CicloActual", value: "cicloActual", sortable: true, filterable: false },
        { text: "Parcial1", value: "idCalificacion.parcial1", sortable: false, filterable: false},
        { text: "Parcial2", value: "idCalificacion.parcial2", sortable: false, filterable: false },
        { text: "Parcial3", value: "idCalificacion.parcial3", sortable: false, filterable: false },
        { text: "Acciones", value: "acciones", sortable: false, filterable: false},
      ],
    };
  },

  methods: {
   

    filtrarBusqueda(value, busqueda) {
      //busqueda.toLocaleUpperCase;
      return (
        value != null &&
        busqueda != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(busqueda.toLocaleUpperCase) !== -1
      );
    },

    obtenerEstudiantesDisplay(e) {
      return {
        idEstudiante: e.idEstudiante,
        nombre: e.nombre,
        matricula: e.matricula,
        apellidos: e.apellidos,
        edad: e.edad,
        carrera: e.carrera,
        cicloActual: e.cicloActual,
        idCalificacion: {
          idCalificacion: e.idCalificacion,
          parcial1: e.idCalificacion.parcial1,
          parcial2: e.idCalificacion.parcial2,
          parcial3: e.idCalificacion.parcial3,
        },
      };
    },

    obtenerEstudiantes() {
      EstudianteServicio.obtener()
      .then((r) => {
        this.estudiantes = r.data.map(this.obtenerEstudiantesDisplay);
      })
      .catch(e => {
        console.log(e);
      });
    },

    refrescarListaEstudiantes(){
      this.obtenerEstudiantes();
    },

    editarEstudiante(id) {
      this.$router.push({name: "editarEstudiante", params: {id : id}});
    },

    eliminarEstudiante(id){
      EstudianteServicio.eliminar(id)
      .then(() => {
        this.refrescarListaEstudiantes();
        this.eliminarDialog = false;
        this.estudianteTmp = "";
      })
      .catch(e => {
        console.log(e);
      })
    },
  },
};
</script>

<style>
.v-data-table th {
  background-color: #004d40 !important;
}

.v-data-table__wrapper table thead tr th{
 color: #ffffff !important;
}

.v-data-table-header th {
  white-space: nowrap;
}

</style>
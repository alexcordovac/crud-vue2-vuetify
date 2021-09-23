<template>
  <v-app>
    <div v-if="!$route.meta.hideNavigation">
    <!--<v-system-bar color="orange darken-4"></v-system-bar>-->
    <v-app-bar color="teal darken-4" dark app clipped-left>
      <v-app-bar-nav-icon
        class="ml-2"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>CRUD Estudiantes</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-filter</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      clipped
      :style="{ top: $vuetify.application.top + 'px', zIndex: 4 }"
    >
      <v-list>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item :to="{ path: '/' }">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[0] }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ path: '/estudiantes' }">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[1] }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>Estudiantes</v-list-item-title>
          </v-list-item>

          <v-list-item :to="{ path: '/buscarEstudiante' }">
            <v-list-item-action>
              <v-icon>mdi-{{ icons[2] }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>Buscar matricula</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </div>

    <v-main>
      <v-container fluid fill-height style="align-items: start; padding: 0">
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>

    <!-- Barra inferior para notificaciones
    <v-snackbar v-model="snackbar.estado" :timeout="snackbar.tiempo" :color="snackbar.color">
      {{ snackbar.mensaje }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.estado = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar> -->
  </v-app>
</template>

<script>

export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
    icons: ["home", "account", "account-search"],
  }),


  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

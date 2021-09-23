<template>
  <v-container fluid class="section-container" fill-height>
    <v-row class="signin text-center">
      <v-col cols="12" sm="8" class="left">
        <h1>Bienvenido al sistema de calificaciones</h1>
        <v-img
          :src="require('../assets/estudiantelogo.png')"
          class="mt-10"
          contain
          height="400"
        />
      </v-col>

      <v-col cols="12" sm="4" class="right">
        <h2>Identifícate</h2>
        <v-form name="form" @submit.prevent="handleLogin">
          <ValidationProvider name="usuario" rules="required|max:20">
            <v-text-field
              color="white"
              slot-scope="{ errors, valid }"
              v-model="user.usuario"
              :counter="20"
              :error-messages="errors"
              :success="valid"
              label="Usuario"
              required
            ></v-text-field>
          </ValidationProvider>

          <ValidationProvider name="contrasena" rules="required|max:15">
            <v-text-field
              color="white"
              slot-scope="{ errors, valid }"
              v-model="user.contrasena"
              :error-messages="errors"
              :success="valid"
              label="Contraseña"
              required
            ></v-text-field>
          </ValidationProvider>

          <v-spacer></v-spacer>

          <div class="text-center mt-10">
            <v-btn class="signin-btn" type="submit" rounded color="white" dark>
              Iniciar sesión
            </v-btn>
            <div v-if="message" class="alert alert-danger mt-10" role="alert">
              {{ message }}
            </div>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import { required, email } from "vee-validate/dist/rules";

import Usuario from "../models/Usuario";
import { ValidationProvider } from "vee-validate";

// extend('required', {
//   ...required,
//   message: '{_field_} can not be empty'
// })

export default {
  name: "Login",

  components: {
    ValidationProvider,
  },
  data: () => ({
    showPass: false,
    user: new Usuario("", ""),
    loading: false,
    message: "",
  }),

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },

  methods: {
    handleLogin() {
      this.message = "";
      this.loading = true;

      this.$validator.validateAll().then((isValid) => {
        console.log("Manejando login...");

        if (!isValid) {
          this.loading = false;
          console.log("handleLogin. No válido");
          return;
        }

        if (this.user.usuario && this.user.contrasena) {
          this.$store
            .dispatch("auth/login", this.user)
            .then(() => {
              this.$router.push("/").catch(() => {
                console.log("Login. No se pudo redireccionar a '/'");
                this.message = "Autenticación fallida."
              });
            })
            .catch((error) => {
              console.log("Error autenticando: " + error);
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            });
        }
      });
    },

    //metodos
  },
};
</script>

<style lang="scss" scoped>
.section-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  background: #fff;
  box-sizing: border-box;
  height: 100vh;
  .signin {
    min-height: 100%;
    box-shadow: 0 0 1px 1px rgba($color: #000000, $alpha: 0.1);
    .left {
      padding: 30px;
      box-sizing: border-box;
      color: #30ac7c;
      background-color: #f9f9f9;
    }
    .right {
      padding: 30px;
      box-sizing: border-box;
      background: #30ac7c;
      color: #fff;
      h2 {
        text-align: center;
        margin: 30px 0;
      }
      .signin-btn {
        width: 100%;
        color: #30ac7c;
      }
    }
  }
}
</style>>


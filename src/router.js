import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/inicio",
            name: "inicio",
            component: () => import("./components/Inicio")

        },
        {
            path: "/estudiantes",
            name: "listarEstudiante",
            component: () => import("./components/Listar")
        },
        {
            path: "/agregarEstudiante",
            name: "agregarEstudiante",
            component: () => import("./components/Agregar")
        },
        {
            path: "/editarEstudiante/:id",
            name: "editarEstudiante",
            component: () => import("./components/Editar")
        },
        {
            path: "/buscarEstudiante",
            name: "buscarEstudiante",
            component: () => import("./components/BuscarEstudiante")
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import("./components/Login"),
            meta: { hideNavigation: true }
        }
    ]

});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router

/*
import VueRouter from 'vue-router';

//Uso de VueRouter
Vue.use(VueRouter);

//Definir rutas
const routes = [
  {path: '/', component:Inicio},
  {path: '/inicio', component:Inicio},
  {path: '/estudiantes', component:Listar},
  {path: '/agregarEstudiante', component:Agregar, name:'agregarEstudiante'},
  {path: '/editarEstudiante/:id', component:Editar, name:'editarEstudiante'},
  {path: '/buscarEstudiante', component:BuscarEstudiante, name:'buscarEstudiante'}
]

//Creamos el objeto router
const router = new VueRouter({
  routes,
  mode: 'history'
})
*/
export const snackbar = {
    state: {
        snackbar: {
            estado: false, 
            color: "", 
            mensaje: "Hola",
            tiempo: -1,
        }
    },
    mutations: {
        SET_SNACKBAR(state, snackbar) {
            state.snackbar = snackbar;
        }
    },
    actions: {
        snackBar({ commit }, payload) {
            commit("SET_SNACKBAR", {
                estado: true,
                color: payload.color,
                mensaje: payload.mensaje,
                tiempo: payload.tiempo,
            });
        }
    }
};
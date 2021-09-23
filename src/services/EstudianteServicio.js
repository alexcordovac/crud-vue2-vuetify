import http from "../http-common"

class EstudianteServicio {

    //Obtener todos los estudiantes
    obtener() {
        return http.get("/estudiantes");
    }

    //Obtener por ID
    obtenerPorId(id) {
        return http.get(`/estudiantes/${id}`);
    }

    //Agregar
    agregar(entidad) {
        return http.post("/estudiantes", entidad);
    }

    //Actualizar
    actualizar(entidad, id) {
        return http.put(`/estudiantes/${id}`, entidad);

    }

    //Eliminar
    eliminar(id) {
        return http.delete(`/estudiantes/${id}`)
    }

    //Buscar por matricula
    buscarMatricula(matricula) {
        return http.get(`/estudiantes/matricula/${matricula}`)
    }
}

export default new EstudianteServicio();
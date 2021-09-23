import http from "../http-common"

//const API_URL = 'http://localhost:8080/';

class AuthService {
    login(user) {
        return http
            .post('/autenticar', {
                usuario: user.usuario,
                contrasena: user.contrasena
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                if(response.status === 401){
                    return response;
                }

                return response.data;
            })
            .catch(e => {
                console.log("Servicio error: "+e);
            })
    }

    logout() {
        localStorage.removeItem('user');
    }

//     register(user) {
//         return axios.post(API_URL + 'signup', {
//             username: user.username,
//             email: user.email,
//             password: user.password
//         });
//     }

}

export default new AuthService();

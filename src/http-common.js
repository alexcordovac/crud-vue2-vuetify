import axios from "axios";
import authHeader from './services/auth-header'

//Incerceptar cada request de axios
//
// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization =  authHeader();

//   return config;
// });



const http = () => {
  const defaultOptions = {
    baseURL: "http://localhost:8080/",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = authHeader()
    config.headers.Authorization = token ? token : '';
    return config;
  });

  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {

      //Revisamos si hay token y lo borramos (por expirado)
      let user = JSON.parse(localStorage.getItem('user'));
      if(user && user.accessToken){
        localStorage.removeItem('user');
      }
      console.log("ACCESO DENEGADO")
    }
    return error;
  });

  return instance;
};

export default http();

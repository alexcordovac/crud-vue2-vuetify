export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      console.log("Token encontrado!");
      return 'Bearer ' + user.accessToken ; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      console.log("Token no encontrado!");
      return {};
    }
  }
  
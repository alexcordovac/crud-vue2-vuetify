import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store/';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(Vuex);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

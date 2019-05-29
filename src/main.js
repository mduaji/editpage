import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";
import vuerouter from "vue-router";
import bootstrapvue from "bootstrap-vue";
import store from "./store/store";
import { routes } from './router/router';
import veevalidate from "vee-validate";

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex);
Vue.use(vuerouter);
Vue.use(bootstrapvue);
Vue.use(veevalidate);

const router = new vuerouter({
  routes,
  mode: 'history'
});


new Vue({
  router:router,
  store,
  render: h => h(App),
}).$mount('#app')

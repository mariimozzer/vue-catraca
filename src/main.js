import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMask from 'v-mask'
import { VueMaskDirective } from 'v-mask'
Vue.directive("mask", VueMaskDirective);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(VueMask);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

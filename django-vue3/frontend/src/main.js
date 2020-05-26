import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { ClientTable } from 'vue-tables-2';
import VueRouter from 'vue-router';
import router from './router'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueResource from 'vue-resource';
import store from './store';
import { VueContext } from 'vue-context';




Vue.use(ClientTable);
Vue.use(VueRouter);
Vue.use(VueResource);


Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDRUhI7MdmbuvNOClz1TFXiMZ69Oj6fODs',
   // libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  VueContext,
  render: h => h(App)
}).$mount('#app')



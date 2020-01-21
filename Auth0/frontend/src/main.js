// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import App from './App'
import router from './router'
//import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib'
import { ClientTable } from 'vue-tables-2';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.use(ClientTable);

Vue.use(Vuetify)
const opts = {}

export default new Vuetify(opts)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  router,
  components: { App },
  template: '<App/>'
})


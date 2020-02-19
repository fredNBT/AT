import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify/lib'
import About from '@/components/About'
import Overview from '@/components/Overview'

Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/About',
      name: 'about',
      component: About
    },
    {
      path: '/',
      name: 'overview',
      component: Overview
    },
    {
      path:'/Details',
      name: 'details',
      component: About
    },
    {
      path:'/Alarms',
      name: 'details',
      component: About
    }
  ],
  mode: 'history'
});



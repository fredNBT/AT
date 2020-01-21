import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify/lib'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Overview from '@/components/Overview'

Vue.use(Vuetify)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
    }
  ],
  mode: 'history'
});



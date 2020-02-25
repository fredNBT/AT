import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'steves',
    links: [
      'http://google.com',
      'http://AshramLabs.com'
    ],
    Alarms: [
      'first Alarm',
  ],
  },
  getters: {
    countLinks: state => {
      return state.links.length
    }
  },
  mutations: {
    ADD_LINK: (state, link) =>{
      state.links.push(link)
    },
  },
  actions: {
    ADD_ALARMS: (state) =>{
      state.Alarms.push('secondAlarm')
      ADD_ALARM2
    },
    ADD_ALARM2: (state) =>{
      state.Alarms.push('third')
    }
  },
  modules: {
  }
})

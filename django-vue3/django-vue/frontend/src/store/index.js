import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  /* 
Messages [] holds the MQTT messaes from the Alarms
 Alarms [] holds the Alarms from the Database
*/ 
  state: {
    title: 'State Store EX',
    Messages: [],
    Alarms: [],
  },
  // Stubbed in computed property
  getters: {
    countLinks: state => {
      return state.Messages
    }
  },
  mutations: {
    ADD_MESSAGE: (state, message) => { 
      // check if Alarm signal is already in Messages if not add to it.
      if (!state.Messages.includes(message)){
        state.Messages.push(message)
      }
    },
    setAlarms: (state, Alarms) => {
      Alarms.forEach(AlarmItem => {
        state.Alarms.push(AlarmItem)
      });
    },
  },
  actions: {
    // Load All Alarms from the Database
    async  fetchAlarms({ commit }) {
      const response = await axios.get(
        'http://localhost:8000/drones/Alarms'
      );
      commit('setAlarms', response.data);
    },
  },
  modules: {
  }
})

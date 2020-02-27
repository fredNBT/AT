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
      return state.Messages.length
    }
  },
  mutations: {
    ADD_MESSAGE: (state, message) => { state.Messages.push(message) },
    setAlarms: (state, Alarms) => {
      Alarms.forEach(AlarmItem => {
        console.log(AlarmItem.Alarm_Name)
        state.Alarms.push(AlarmItem.Alarm_Name)
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




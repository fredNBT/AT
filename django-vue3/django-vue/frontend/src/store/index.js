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
    title: 'State Store Example',
    Messages: [],
    Alarms: [],
    MappingAlarms: [] // Aray used for the googleMaps
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
          state.MappingAlarms.forEach(AlarmItem => {
          console.log("Alarmitem", AlarmItem.AlarmName);
          if(AlarmItem.AlarmName == message){
            AlarmItem.img = require("../../src/assets/Tracking.gif")
          }
        })
      }
    },
     
    setAlarms: (state, Alarms) => {
      Alarms.forEach(AlarmItem => {
        state.Alarms.push(AlarmItem)
        //Push every element for the DB to Mapping Alarms for google maps - requires 
        state.MappingAlarms.push(
          {
            AlarmName: AlarmItem.Alarm_Name,
            pos: { lat: AlarmItem.Lat, lng: AlarmItem.Long },
            img: require("../../src/assets/logo.svg"), 
        })
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

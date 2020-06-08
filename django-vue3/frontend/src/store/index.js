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
    DroneMessages: [],
    Alarms: [],
    Drones: [],
    MappingAlarms: [], // Aray used for the googleMaps
    MappingDrones: [] // Aray used for the googleMaps
  },
  // Stubbed in computed property
  getters: {
    countLinks: state => {
      return state.Messages
    },
  },

  mutations: {
    ADD_MESSAGE: (state, message) => {
      console.log("message", message);

      // check If the message if for a drone or for a alarm
      state.Drones.forEach(DroneItem => {
        console.log(DroneItem.Name)
        // Message[0] is the topic
        // check if item as already been entered into Array - If it has update it - If not add it.
        if (message[0] == DroneItem.Name) {
          const json = message[1];
          const MessageFromDrone = JSON.parse(json);
          console.log(MessageFromDrone)
          //{"position": {"lat": "52.5332335", "lon": "13.2623724", "alt": "0.01"}, "telem": {"battery": "Battery:voltage=12.587,current=0.0,level=39", "ekf_ok": true, "last_heartbeat": "0.2809999999590218", "heading": "216", "system_status": "STANDBY", "groundspeed": "0.0", "airspeed": "0.0", "mode": "RTL", "armed": false}, "is_at_alarm": false, "failure": false}
        // Finds Drone in Array and updates with new information  
          var foundIndex = state.MappingDrones.findIndex(x => x.DroneName == DroneItem.Name);
          state.MappingDrones[foundIndex].pos.lng = MessageFromDrone.position.lon
          state.MappingDrones[foundIndex].pos.lat = MessageFromDrone.position.lat
          state.MappingDrones[foundIndex].pos.alt = MessageFromDrone.position.alt
          state.MappingDrones[foundIndex].speed = MessageFromDrone.telem.groundspeed
      
        }
      });

      /* groundspeed
        Check what message has come from the Alarm
        0 = reset Alarm
        1 = Alarm has been triggered
        2 = disable Alarm
 */
      // check if Alarm signal is already in Messages if not add to it.
      if (!state.Messages.includes(message)) {
        state.Messages.push(message)
        //Check All Alarm 
        state.MappingAlarms.forEach(AlarmItem => {
          //console.log("Alarmitem", AlarmItem.AlarmName);
          if (AlarmItem.AlarmName == message[0]) {
            if (message[1] === "1") {
              AlarmItem.img = require("../../src/assets/Tracking.gif")
            }
            if (message[1] === "0") {
              console.log("reset Alarm")
              AlarmItem.img = require("../../src/assets/logo.svg")
            }
            if (message[1] === "2") {
              console.log("disableAlarm")
              AlarmItem.img = require("../../src/assets/Disable.png")
            }
          }
        })
      }
    },

    setAlarms: (state, Alarms) => {
      Alarms.forEach(AlarmItem => {
        state.Alarms.push(AlarmItem)
        //Push every element for the DB to Mapping Alarms for google maps 
        state.MappingAlarms.push(
          {
            AlarmName: AlarmItem.Alarm_Name,
            pos: { lat: AlarmItem.Lat, lng: AlarmItem.Long },
            img: require("../../src/assets/logo.svg"),
          })
      });
    },

    setDrones: (state, Drones) => {
      //console.log(Drones)
      Drones.forEach(DroneItem => {
        state.Drones.push(DroneItem)
        //Push every element for the DB to Mapping Alarms for google maps 
        state.MappingDrones.push(
          {
            DroneName: DroneItem.Name,
            pos: { lat: DroneItem.Lat, lng: DroneItem.Lon },
            img: require("../../src/assets/DroneIcon2.gif"),
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
    async  fetchDrones({ commit }) {
      const response = await axios.get(
        'http://localhost:8000/drones/Drones'
      );
      commit('setDrones', response.data);
    },
  },
  modules: {
  }
})

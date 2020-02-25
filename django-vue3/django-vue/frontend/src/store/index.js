import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    links: [],
    Alarms: [],
  },
  getters: {
    countLinks: state => {
      return state.links.length
    }
  },
  mutations: {
    ADD_LINK: (state, link) =>{state.links.push(link)},
    setAlarms: (state, Alarms) => {
      Alarms.forEach(AlarmItem => {
        console.log(AlarmItem.Alarm_Name)
        state.Alarms.push(AlarmItem.Alarm_Name)
      });
    },
      
  },
  actions: {
    async  fetchAlarms({ commit }){
      const response = await axios.get(
      'http://localhost:8000/drones/Alarms'
      );
      commit('setAlarms', response.data);
  }, 
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




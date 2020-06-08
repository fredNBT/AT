<template>
  <div>
    <h2>Alarms</h2>
    <div style="width: 100%; display:flex; margin-top:5vh">
      <GmapMap
        ref="mymap"
        :center="{lat:52.5324657, lng:13.2614147}"
        :zoom="17"
        map-type-id="satellite"
        style="width: 50vw; height:50vh"
      >
        <!-- Create a custom marker for every Item in the DB -->
        <gmap-custom-marker
          :key="index"
          v-for="(m, index) in MappingAlarms"
          :marker="m.pos"
          :clickable="true"
          @click.native="OpenPannel(m, 'Alarm')"
        >
          <img v-bind:src="m.img" style="width:50px; height: 50px">

        </gmap-custom-marker>
          <!-- Create a Drone marker for every Item in the DB -->
          <gmap-custom-marker
          :key="index"
          v-for="(m, index) in MappingDrones"
          :marker="m.pos"
          :clickable="true"
          @click.native="OpenPannel(m, 'Drone')"
        >
          <img v-bind:src="m.img" style="width:50px; height: 50px">
        </gmap-custom-marker>

      </GmapMap>
      <div
        id="AlarmPanel" style="height:50vh;overflow-y: scroll; width: 20vw; margin-left:5px; visibility: hidden;"
      >
        <h2 id="SelectedAlarmHeader">{{SelectedAlarm.AlarmName}}</h2>
        <div  id="AlarmButtons" style="visibility: hidden;">
          <v-btn class="blue white--text" @click="SendCommand('0')">Reset Alarm</v-btn>
          <v-btn class="blue white--text" @click="SendCommand('2')">Disable Alarm</v-btn>
        </div>

          <div  id="DroneButtons" style="visibility: hidden;">
          <h2 id="SelectedAlarmHeader">{{SelectedAlarm.DroneName}}</h2>

          <div>
            <v-btn class="blue white--text" @click="SendCommand('0')">RTL</v-btn>
            <v-btn class="blue white--text" @click="SendCommand('2')">Disable Drone</v-btn>
          </div>

          <div style="margin-top:100px">
          
            <div style="display: flex; justify-content: space-around;">
              <h6 style="color:#329EF4; float:left">Latitude</h6>
              <h5>{{MappingDrones[SelectedAlarmIndex].pos.lat}}</h5>
            </div>
             <div style="display: flex; justify-content: space-around;">
              <h6 style="color:#329EF4 ; float:left">Longitude</h6>
              <h5>{{MappingDrones[SelectedAlarmIndex].pos.lng}}</h5>
            </div>
            <div style="display: flex; justify-content: space-around;">
              <h6 style="color:#329EF4 ; float:left">Speed</h6>
              <h5>{{MappingDrones[SelectedAlarmIndex].speed}} Kmh</h5>
            </div>
            <div style="display: flex; justify-content: space-around;">
              <h6 style="color:#329EF4 ; float:left">Alt</h6>
              <h5>{{MappingDrones[SelectedAlarmIndex].pos.alt}} m</h5>
            </div>
            
          
          </div>
        </div>
      </div>
    </div>

    <v-btn v-on:click="ClearAllAlarms()">Clear All Alarms</v-btn>
    <v-client-table :columns="columns" :data="Alarms"></v-client-table>
    <v-btn style="height: 200px" v-on:click="test()">
      <span style="color:red" left>test</span>
    </v-btn>
    
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";
import GmapCustomMarker from "vue2-gmap-custom-marker";
import { connect } from "mqtt";
var mqtt = require('mqtt');

export default {
  name: "app",
  props: ["headers"],
  data() {
    return {
      columns: ["id", "Alarm_Name", "Alarm_Type", "Lat", "Long"], // columns to link to the vuetify table
      marker: [], // Pins showing where the Alarms Are Based
      SelectedAlarm: "", // Hold the current clicked alarm
      SelectedAlarmIndex:"0" // Hold the current clicked alarm index
    };
  },
  components: {
    "gmap-custom-marker": GmapCustomMarker
  },
  computed: {
    ...mapState(["title", "Messages", "Alarms", "MappingAlarms", "MappingDrones"])
  },
  methods: {
    // resets All Alarms on the Backend
    ClearAllAlarms: function() {
      alert("alarms cleared");
      const res = axios.get("http://localhost:8000/drones/ClearAllAlarms");
    },
    
    // connects again to Mosquito and sneds alarm code.
      SendCommand: function(command) {
      const client = connect("mqtt://78.47.164.96:9001");
      client.publish(this.SelectedAlarm.AlarmName,command)
    },

    //Opens pannel to disable the alarm.
    OpenPannel: function(marker, item) {
      // pass all the details to the alarmPanel
      if(item == 'Alarm'){
        this.SelectedAlarm = marker;
      document.getElementById("AlarmPanel").style.visibility = "visible"; //AlarmButtons
      document.getElementById("DroneButtons").style.visibility = "hidden";
      document.getElementById("AlarmButtons").style.visibility = "visible";
           }
      if(item == 'Drone'){
        console.log('marker:',marker)
        this.SelectedAlarm = marker;
        this.SelectedAlarmIndex = this.MappingDrones.indexOf(marker);
        document.getElementById("AlarmPanel").style.visibility = "visible";
        document.getElementById("AlarmButtons").style.visibility = "hidden";
        document.getElementById("DroneButtons").style.visibility = "visible";

   
      }
      
    }
  },

  async created() {
    // on created Load all Alarms from
    this.Alarms.forEach((value, index) => {
      this.marker.push({
        pos: { lat: value.Lat, lng: value.Long },
        img: require("../../src/assets/logo.svg")
      });
    });
  }
};
</script>
<style scoped>
#app {
  width: 95%;
  margin-top: 50px;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

.button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
</style>

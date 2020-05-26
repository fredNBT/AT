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
          @click.native="OpenPannel(m)"
        >
          <img v-bind:src="m.img" style="width:50px; height: 50px">
        </gmap-custom-marker>
      </GmapMap>
      <div
        id="AlarmPanel"
        style="height:50vh;overflow-y: scroll; width: 20vw; margin-left:5px; visibility: hidden;"
      >
        <h2 id="SelectedAlarmHeader">{{SelectedAlarm.AlarmName}}</h2>
        <div style="flex">
          <v-btn class="blue white--text" @click="ResetAlarm()">Reset Alarm</v-btn>
          <v-btn class="blue white--text">Disable Alarm</v-btn>
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
      SelectedAlarm: ""
    };
  },
  components: {
    "gmap-custom-marker": GmapCustomMarker
  },
  computed: {
    ...mapState(["title", "Messages", "Alarms", "MappingAlarms"])
  },
  methods: {
    // resets All Alarms on the Backend
    ClearAllAlarms: function() {
      alert("alarms cleared");
      const res = axios.get("http://localhost:8000/drones/ClearAllAlarms");
    },
    // connects again to Mosquito and resets alarm.
      ResetAlarm: function() {
      const client = connect("mqtt://78.47.164.96:9001");
      client.publish(this.SelectedAlarm.AlarmName,"0")
    },
    //Opens pannel to disable the alarm.
    OpenPannel: function(m) {
      // pass all the details to the alarmPanel
      this.SelectedAlarm = m;
      document.getElementById("AlarmPanel").style.visibility = "visible";
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
</style>

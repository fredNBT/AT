<template>
  <div>
    <p>Alarms</p>
    
    <GmapMap
      ref="mymap"
      :center="{lat:52.5333973, lng:13.2595595}"
      :zoom="17"
      map-type-id="satellite"
      style="width: 50vw; height:50vh"
    >
      <gmap-custom-marker :key="index" v-for="(m, index) in marker" :marker="m.pos">
        <img v-bind:src="m.img" style="width:50px; height: 50px">
      </gmap-custom-marker>
    </GmapMap>
    <v-btn  v-on:click="ClearAllAlarms()">Clear All Alarms</v-btn>
    <v-client-table :columns="columns" :data="Alarms"></v-client-table>
    <v-btn style="height: 200px" v-on:click="test()">
      <span style="color:red" left>test</span>
    </v-btn>
    
  </div>
</template>

<script>
import axios from "axios";
import GmapCustomMarker from "vue2-gmap-custom-marker";
//AlarmState

export default {
  name: "app",
  props: ["headers"],
  data() {
    return {
      Alarms: [],
      columns: ["id", "Alarm_Name", "Alarm_Type", "Lat", "Long"],
      marker: []
    };
  },
  components: {
    "gmap-custom-marker": GmapCustomMarker
  },
  methods: {
    async AlarmState() {
      const res = await axios.get("http://localhost:8000/drones/AlarmState", {
        params: {
          Drone: this.SingleDrone
        }
      });
      let stringy = JSON.stringify(res.data);
      console.log(stringy)
      if (stringy == '"True"'){
        this.marker[2].img = require("../../src/assets/Tracking.gif")
      }
      else{this.marker[2].img = require("../../src/assets/logo.svg")}
    },
    ClearAllAlarms: function(){
       
      const res =  axios.get("http://localhost:8000/drones/ClearAllAlarms");
  
    }
  },
  async created() {
    setInterval(this.AlarmState, 1000);

    try {
      const res = await axios.get("http://localhost:8000/drones/Alarms");
    
      res.data.forEach(element =>
        this.marker.push({
          pos: { lat: element.Lat, lng: element.Long },
          img: require("../../src/assets/logo.svg")
        })
      );
      this.Alarms = Object.entries(JSON.parse(res.data));
    } catch (e) {
      const res = await axios.get('http://localhost:8000/drones/Alarms')
      let stringy = JSON.stringify(res.data)
      console.log(stringy)
      this.Alarms = JSON.parse(stringy)
    }
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

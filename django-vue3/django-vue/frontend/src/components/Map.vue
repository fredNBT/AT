<template>
  <div>
    <h1>Mapping</h1>

    <p>Drone :</p>
    <p>{{SingleDrone}}</p>
    <div style="display:flex;  justify-content: space-evenly;">
      <v-btn v-on:click="greet('Map')">Back to Overview</v-btn>
      <div style="display:flex; flex-direction: column;  ">
        <v-btn style="margin-bottom:50px" v-on:click="PostMQTT('ARM')">
          <span left>UAV On</span>
        </v-btn>
        <v-btn v-on:click="PostMQTT('DISARM')">
          <span left>UAV Off</span>
        </v-btn>
      </div>
      <v-btn>
        <span left>TEST UAV {{SingleDrone}}</span>
      </v-btn>
      <v-btn>
        <span left>Alarmregion 1</span>
      </v-btn>
      <v-btn>
        <span left>Alarmregion 2</span>
      </v-btn>
      <v-btn v-on:click="FillConsole">
        <span left>Test</span>
      </v-btn>
      <v-btn style="height: 200px" v-on:click="PostMQTT('RTL')">
        <span style="color:red" left>NOTLANDUNG</span>
      </v-btn>
    </div>

    <div style="width: 100%; display:flex; margin-top:5vh">
      <GmapMap
        ref="mymap"
        :center="{lat:52.5333973, lng:13.2595595}"
        :zoom="17"
        map-type-id="satellite"
        style="width: 50vw; height:50vh"
      >
        <gmap-custom-marker :marker="marker" >
          <img src="../../src/assets/DroneIcon2.gif" style="width:70px; height: 70px">
        </gmap-custom-marker>
      </GmapMap>

      <div id="ConsoleLogDiv" style="height:50vh;overflow-y: scroll; width: 20vw; background-color:black; color:white; margin-left:5px;">
        <p>Console</p>
        <div
          style="display:flex; "
          v-for="(listItem, index) in ConsoleLogs"
          class="my-2 field"
          :key="index"
        >
          <p style="width: 200px">{{ConsoleLogs[index].MsgTime}}</p>
          <p style="width: 100px; padding-right: 30px;">{{ConsoleLogs[index].Msg }}</p>
          <p style="width: 10px; padding-right: 30px;">{{ConsoleLogs[index].Origin}}</p>
        </div>
      </div>
    </div>
    <div style="height:20vh"></div>
  </div>
</template>

<script>
import axios from "axios";
import GmapCustomMarker from "vue2-gmap-custom-marker";

export default {
  name: "App",
  props: ["SingleDrone"], //'ConsoleLog'

  data() {
    return {
      ConsoleLogs: [],
      marker: {
        lat: 52.5333973,
        lng: 13.2595595
      }
    };
  },
  components: {
    "gmap-custom-marker": GmapCustomMarker
  },
  created() {
    setInterval(this.FillConsole, 1000);
    setInterval(this.DroneGPS, 1000);
  },
  mounted() {
    this.$refs.mymap.$mapPromise.then(() => {
    });
  },
  destroyed(){


  },

  methods: {
    async FillConsole() {
      const res = await axios.get("http://localhost:8000/drones/Console", {
        params: {
          Drone: this.SingleDrone
        }
      });
      if (this.ConsoleLog != res.data) {
        console.log(this.ConsoleLog);
        this.ConsoleLogs = res.data;
        var element = document.getElementById("ConsoleLogDiv");
        element.scrollTop = element.scrollHeight;
      }
    },

    async DroneGPS(){
      const res = await axios.get("http://localhost:8000/drones/DroneGPS", {
        params: {
          Drone: this.SingleDrone
        }
      });
      let stringy = JSON.stringify(res.data)
      console.log(stringy)
      var obj = JSON.parse(stringy)
      this.marker = {lat: obj.Lat, lng: obj.Long}
    },
    greet: function(rowID) {
      this.$emit("GoToMap", "Map");
    },
    async PostMQTT(Msg) {
      const res = await axios.get("http://localhost:8000/drones/PublishMQTT", {
        params: {
          Topic: this.SingleDrone,
          Msg: Msg
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

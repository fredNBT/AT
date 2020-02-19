<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app class="blue" style="margin-top:220px; padding-top:100px">
      <v-list style="flex" left>
      
        <v-list-item class="SideDrawItems">
          <v-list-item-content >
            <v-list-item-title style="text-align:left">
              <img src="../../src/assets/AlarmIcon.png" style="width:35px; height: 35px; margin-right:20px">
              <v-icon left></v-icon>
              <span v-on:click="ViewAlarms" style="color:LightGrey">Alarms</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="SideDrawItems">
          <v-list-item-content>
            <v-list-item-title style="text-align:left">
              <img src="../../src/assets/DroneIcon.png" style="width:35px; height: 35px; margin-right:20px">
              <v-icon left></v-icon>
              <span v-on:click="ViewOverview" style="color:LightGrey">Drones</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="SideDrawItems">
          <v-list-item-content >
            <v-list-item-title style="text-align:left">
              <img src="../../src/assets/AccountIcon.png" style="width:35px; height: 35px; margin-right:20px">
              <v-icon left></v-icon>
              <span  style="color:LightGrey;">Account</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="SideDrawItems">
          <v-list-item-content>
            <v-list-item-title style="text-align:left">
              <img src="../../src/assets/ArrowTecIcon.png" style="width:35px; height: 35px; margin-right:20px">
              <v-icon left></v-icon>
              <span  style="color:LightGrey">About</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <DashData></DashData> -->
    <component
      :is="currentComponent"
      @GoToMap="UpdateMap"
      v-bind:SingleDrone="SingleDrone"
      style="margin-left:400px">
      </component>
  </v-app>
</template>

<script>
import DashData from "./DashData";
import DroneData from "./DroneData";
import About from "./About";
import AlarmData from "./AlarmData";
import Map from "./Map";

export default {
  name: "App",
  props: ["SingleDrone"],
  components: {
    DashData,
    DroneData,
    AlarmData,
    About,
    Map
  },
  data: () => ({
    currentComponent: "DroneData",
    SingleDrone: 7
  }),

  methods: {
    ViewAlarms: function() {
      this.currentComponent = AlarmData;
    },
    ViewOverview: function() {
      this.currentComponent = DroneData;
    },
    UpdateMap: function(rowID) {
      if (rowID == "Map") {
        this.currentComponent = DroneData;
      } else {
        this.currentComponent = Map;
        this.SingleDrone = rowID;
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.SideDrawItems{
  width:100%;

  align-content: flex-start;
  
}
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

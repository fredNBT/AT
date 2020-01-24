<template>
<v-app>
      <v-navigation-drawer v-model="drawer" app class="indigo" style="margin-top:200px">
      <v-list style="flex" left>
        <!-- <router-link to="/about">About</router-link> -->
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          style="flex-direction: column; float:left;"
        >
          <v-list-item-action></v-list-item-action>
          <v-list-item-content style="float:left">
            <v-list-item-title style="float:left">
              <v-icon left>{{link.icons}}</v-icon>
              <span style="color:LightGrey">{{link.text}}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item style="flex-direction: column; float:left;">
        <v-list-item-content style="float:left">
          <v-list-item-title style="float:left">
            <v-icon left>mdi-account-multiple-minus</v-icon>
            <span v-on:click="ViewAlarms" style="color:LightGrey">View Alarms</span>
          </v-list-item-title>
        </v-list-item-content>
        </v-list-item>

      <v-list-item style="flex-direction: column; float:left;">
        <v-list-item-content style="float:left">
          <v-list-item-title style="float:left">
            <v-icon left>mdi-account-multiple-minus</v-icon>
            <span v-on:click="ViewOverview" style="color:LightGrey">View Overview</span>
          </v-list-item-title>
        </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
   
  <!-- <DashData></DashData> -->
  <component :is="currentComponent" @GoToMap="UpdateMap" v-bind:SingleDrone="SingleDrone" style="margin-left:400px"></component>
  </v-app>
</template>

<script>

import MenuTitle from './MenuTitle';
import DashData from './DashData';
import DroneData from './DroneData';
import About from './About';
import AlarmData from './AlarmData'
import Map from './Map';

export default {
  name: 'App',
  props: ['SingleDrone'],
  components: {
    MenuTitle,
    DashData,
    DroneData,
    AlarmData,
    About,
    Map
  },
  data: () => ({
      currentComponent: 'DroneData', 
      SingleDrone: 7
  }),
  
   methods: {    
     ViewAlarms: function(){
       this.currentComponent = AlarmData;
     },
      ViewOverview: function(){
       this.currentComponent = DroneData;
     },
      UpdateMap: function(rowID){
        if (rowID  == 'Map'){
          this.currentComponent = DroneData;
        }
        else{
          this.currentComponent = Map;
          this.SingleDrone = rowID
        }
      }
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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

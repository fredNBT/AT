<template>
<v-app>
  <DashData></DashData>
  <!-- <MenuTitle ></MenuTitle> -->
  <!-- <DroneData style="margin-left:400px" @GoToMap="UpdateMap"></DroneData> -->
  <component :is="currentComponent" @GoToMap="UpdateMap" v-bind:SingleDrone="SingleDrone" style="margin-left:400px"></component>

  </v-app>
</template>

<script>

import MenuTitle from './MenuTitle';
import DashData from './DashData';
import DroneData from './DroneData';
import About from './About';
import Map from './Map';



export default {
  name: 'App',
  props: ['SingleDrone'],
    
   
  
  components: {
    MenuTitle,
    DashData,
    DroneData,
    About,
    Map
  },

  data: () => ({
      currentComponent: 'DroneData', // name of your component
      SingleDrone: 7
  }),
  
   methods: {    
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

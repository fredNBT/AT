<template>
<v-app>
  <DashData></DashData>
  <MenuTitle ></MenuTitle>
  <DroneData style="margin-left:400px"></DroneData>
  </v-app>
</template>

<script>

import MenuTitle from './MenuTitle';
import DashData from './DashData';
import DroneData from './DroneData';

export default {
  name: 'App',
  components: {
    MenuTitle,
    DashData,
    DroneData    
  },

  data: () => ({
    //
  }),
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

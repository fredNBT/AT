<template>
  <v-container>
        <v-toolbar style="width=100%; padding:0px; height:120px" >
      <img src="../../src/assets/ArrowTec.png" alt="" style="width:100px;margin-top:50px" >
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer" app v-bind:width="50">  
          <v-icon large left>mdi-menu</v-icon>
        </v-app-bar-nav-icon>
      <span> Arrow</span>
      <span> Tec</span>
      <v-spacer></v-spacer>
      <v-btn text >
        <v-icon large left>mdi-exit_to_app</v-icon>
      </v-btn>
      <span>SIGN OUT</span>
    </v-toolbar>

   <p class="red white--text"> Comp 1 </p>
     <v-btn>
     <span left>Login </span>
   </v-btn>
   <v-btn class="hidden-md-and-down"> click</v-btn>
     
  <v-navigation-drawer v-model="drawer" app class="indigo" style="margin-top:200px" >
      <v-list style="flex" left>
      <v-list-item v-for="link in links" :key="link.text" router :to="link.route" style="flex-direction: column; float:left;"  >
        <v-list-item-action >
        </v-list-item-action>
        <v-list-item-content style="float:left" >
          <v-list-item-title  style="float:left" >
             <v-icon left >{{link.icons}}</v-icon>
            {{link.text}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: 'Comp1',

  data: () => ({
      drawer : true,

      links: [
        {icons: 'mdi-anchor', text: 'Dashboard', route: '/' },
        {icons: 'mdi-account-multiple-minus', text: 'Register New Drone', route: '/steve' },
      ]
    
  })
    
    
};
</script>



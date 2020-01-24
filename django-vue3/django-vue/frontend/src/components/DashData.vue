<template>
  <v-container>
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
      </v-list>
    </v-navigation-drawer>
    
  </v-container>
</template>

<script>
export default {
  name: "Comp1",
  methods: {
  },

  data: () => ({
    drawer: true,

    links: [
      { icons: "mdi-anchor", 
        text: "Dashboard", 
        route: "/" },
      {
        icons: "mdi-account-multiple-plus",
        text: "Register New Drone",
        route: "/About"
      }
    ]
  })
};
</script>



<template>
  <v-container>
   <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer">     <v-icon large left>mdi-face</v-icon>
</v-toolbar-side-icon>
   <p class="red white--text"> Comp 1 </p>
   <v-btn>

     <span left>Login </span>
   </v-btn>
   <v-btn class="hidden-md-and-down"> click</v-btn>
   
  <v-navigation-drawer v-model="drawer" app class="indigo">
    <v-list>
      <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
        <v-list-tile-actio>
           <v-icon>{{link.icons}}</v-icon>

        </v-list-tile-actio>
        <v-list-tile-content>
          <v-list-tile-title>
            {{link.text}}
          </v-list-tile-title>
        </v-list-tile-content>

      </v-list-tile>
    </v-list>
    <p>test</p>
  </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: 'Comp1',

  data: () => ({
      drawer : true,

      links: [
        {icons: 'mdi-face', text: 'Dashboard', route: '/' },
        {icons: 'mdi-face', text: 'Steve', route: '/steve' },


      ]
    
  })
    
    
};
</script>

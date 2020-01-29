<template>
  <div>
    
    <v-toolbar style="width=100%; padding:0px; height:120px">
      <img src="../src/assets/ArrowTec.png" alt style="width:100px;margin-top:50px">
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer" app v-bind:width="50">
        <v-icon large left>mdi-menu</v-icon>
      </v-app-bar-nav-icon>
      <span>Arrow</span>
      <span>Tec</span>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon large left>mdi-exit_to_app</v-icon>
      </v-btn>

      <button class="btn btn-primary btn-margin" v-if="authenticated" @click="logout()">
        <v-btn class="hidden-md-and-down">Sign Out</v-btn>
      </button>

      <button class="btn btn-primary btn-margin" v-if="!authenticated" @click="login()">
        <v-btn class="hidden-md-and-down">Sign In</v-btn>
      </button>
    </v-toolbar>

    <!-- <button
      class="btn btn-primary btn-margin"
      v-if="authenticated"
      @click="privateMessage()"
    >Call Private</button> -->
    {{ message }}
    <br>
    <Overview v-if="authenticated"></Overview>
  </div>
</template>

<script>
import AuthService from "./auth/AuthService";
import axios from "axios";
import Overview from "./components/Overview";


const API_URL = "http://localhost:8000";
const auth = new AuthService();

export default {
  name: "app",
  components: {
    Overview
  },
  data() {
    this.handleAuthentication();
    this.authenticated = false;

    auth.authNotifier.on("authChange", authState => {
      this.authenticated = authState.authenticated;
    });

    return {
      authenticated: false,
      message: ""
    };
  },
  methods: {
    // this method calls the AuthService login() method
    login() {
      auth.login();
    },
    handleAuthentication() {
      auth.handleAuthentication();
    },
    logout() {
      auth.logout();
    },
    privateMessage() {
      const url = `${API_URL}/drones/private`;
      return axios
        .get(url, {
          headers: { Authorization: `Bearer ${auth.getAuthToken()}` }
        })
        .then(response => {
          this.message = response.data || "";
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

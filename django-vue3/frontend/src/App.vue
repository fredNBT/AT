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
    {{ message }}
    <br>
    <Overview v-if="authenticated"></Overview>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { connect } from "mqtt";
var mqtt = require("mqtt");
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
  computed: {
    ...mapGetters(["countLinks"]),
    ...mapState(["title", "Messages", "Alarms", "Drones"])
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
    ...mapMutations(["ADD_MESSAGE"]),
    ...mapActions(["Add_ALARMS", "fetchAlarms", "fetchDrones"]),

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
    },
    init: function() {
      this.fetchDrones();
      this.fetchAlarms(); //Load all Alarms from Database
      var self = this; // var self = this allows this keyword to be refrenced inside a callback
      const client = connect("mqtt://78.47.164.96:9001"); // connect (protocol - IpAddress - port)

      // Initilize callback to fire when client is connected.
      client.on("connect", function() {
        console.log("connected");
        client.publish("User", "Connected");

        //read each Alarm in database and subscribe to to the MQTT feed from each
        // Alarm_Name is the unique vaule for each alarm and is the Topic for MQTT
        self.Alarms.forEach((value, index) => {
          console.log("subscribed to ", value.Alarm_Name);
          client.subscribe(value.Alarm_Name, function(err) {});
        });

        self.Drones.forEach((valuee, index) => {
          console.log("subscribed to ", valuee.Name);
          client.subscribe(valuee.Name, function(err) {});
        });
      });

      client.on("message", (topic, message) => {
        // on message add to Vuex store
        self.addMessage(topic, message);
        console.log("topic: ", topic, "Message: ", message.toString());
      });
    },

    addMessage: function(topic, message) {
      this.ADD_MESSAGE([topic, message.toString()]);
    }
  },
  mounted() {
    this.init();
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

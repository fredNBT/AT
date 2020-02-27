<template>
  <div class="hello">
    <div class="left">
      <h2>{{title}}</h2>

      <p id="AlarmP">No AlARM</p>
      <form @submit.prevent="addLink">
        <input class="link-input" type="text" placeholder="Add a Link" v-model="newMessage">
      </form>
      <ul>
        <li v-for="(Message, index) in Messages" v-bind:key="index">{{Message}}</li>
      </ul>alarms from DataBase
      <ul>
        <li v-for="(Alarm, index) in Alarms" v-bind:key="index">{{Alarm}}</li>
      </ul>
    </div>
    <div class="right">
      <Stats/>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Stats from "@/components/Stats.vue";
import { connect } from "mqtt";

export default {
  name: "HelloWorld",
  data() {
    return {
      newMessage: ""
    };
  },
  components: {
    Stats
  },
  computed: {
    ...mapState(["title", "Messages", "Alarms"])
  },
  methods: {
    ...mapMutations(["ADD_MESSAGE"]),
    ...mapActions(["Add_ALARMS", "fetchAlarms"]),

    init: function() {
      console.log("Init fired")
      this.fetchAlarms(); //Load all Alarms from Database
      var self = this; // var self = this allows this keyword to be refrenced inside a callback
      console.log(this.Alarms);
      const client = connect("mqtt://78.47.164.96:9001"); // connect (protocol - IpAddress - port)
      
      // Initilize callback to fire when client is connected.
      client.on("connect", function() {
        console.log("connected");
        //read each Alarm in database and subscribe to to the MQTT feed from each
        self.Alarms.forEach((value, index) => {
          console.log("subscribed to ", value);
          client.subscribe(value, function(err) {});
        });
      });

      client.on("message", (topic, message) => {
        // on message add to Vuex store
        self.addMessage(topic);
        document.getElementById("AlarmP").innerHTML = topic;
        console.log(message.toString());
      });
    },

    addMessage: function(topic) {
      this.ADD_MESSAGE(topic);
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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

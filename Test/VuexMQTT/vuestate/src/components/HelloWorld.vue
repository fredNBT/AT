<template>
  <div class="hello">
    <div class="left">
      <h2>{{title}}</h2>

      <p id="AlarmP">No AlARM</p>
      <form @submit.prevent="addLink">
        <input class="link-input" type="text" placeholder="Add a Link" v-model="newMessage">
      </form>
      <ul>
        <li v-for="(link, index) in links" v-bind:key="index">{{link}}</li>
      </ul>
      <ul>
        <li v-for="(Alarm, index) in Alarms" v-bind:key="index">{{Alarm}}</li>
      </ul>
    </div>
    <div class="right">
      <Stats/>
    </div>
    <p>value in fun: {{ fun }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Stats from "@/components/Stats.vue";
import { connect } from "mqtt";

export default {
  res: "",
  name: "HelloWorld",
  data() {
    return {
      fun: "fred",
      newMessage: "1"
    };
  },
  components: {
    Stats
  },
  computed: {
    ...mapState(["title", "links", "Alarms"]),
  },
  methods: {
    ...mapMutations(["ADD_LINK"]),
    ...mapActions(["Add_ALARMS","fetchAlarms"]),

    init: function() {
      this.fetchAlarms();
      var self = this;
      console.log(this.Alarms);
      // connect (protocol - IpAddress - port)
      const client = connect("mqtt://78.47.164.96:9001");
      // Initilize callback to fire when client is connected.
      client.on("connect", function() {
        console.log("connected");

        //read each Alarm in database and subscribe to to the MQTT feed from each
        self.Alarms.forEach((value, index) => {
          console.log(value)
          client.subscribe(value, function(err) {
        });
        });
      });

      client.on("message", (topic, message) => {
        // on message add to Vuex store
        self.addMessage(topic);
        document.getElementById("AlarmP").innerHTML = topic;
        console.log("value of fun =", self.fun);
        console.log(message.toString());
        return message;
      });
    },

    addMessage: function(topic) {
      this.ADD_LINK(topic);
    },
  },

  mounted() {
    this.init();
  },


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

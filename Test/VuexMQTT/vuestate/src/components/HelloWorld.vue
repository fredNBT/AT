<template>
  <div class="hello">
    <div class="left">
      <h2>{{title}}</h2>

      <button v-on:click="testclick">Add LInk</button>
      <p id="AlarmP">No AlARM </p>
      <form @submit.prevent="addLink">
        <input class="link-input" type="text" placeholder="Add a Link" v-model="newLink">
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
    <!-- <p id="p1"></p> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Stats from "@/components/Stats.vue";
// import { Client } from "mqtt/";
import { connect } from 'mqtt';

// import { mqtt } from "mqtt";

export default {
  //  client = mqtt.connect("mqtt://78.47.164.96:9001");
  // client.on("connect", function() {
  //   console.log("connected");
  //   client.subscribe("Alarm1", function(err) {
  //     if (!err) {
  //       client.publish("Alarm1", "Hello mqtt");
  //     }
  //   });
  //   client.publish("Alarm1", "test message");
  //   client.on("message", function(topic, message) {
  //     this.addLink();
  //     console.log(message.toString());
  //   });
  // });
  res: '',
  name: "HelloWorld",
  data() {
    return {
      fun: 'fred',
      newLink: "1"
    };
  },
  components: {
    Stats
  },
  computed: {
    ...mapState(["title", "links", "Alarms"]),

    reversedMessage: function () {
      // `this` points to the vm instance
      return this.fun;
    }
  },
  methods: {
    ...mapMutations(["ADD_LINK"]),
    ...mapActions(["Add_ALARMS"]),

    init: function() {
      var self = this;
      
      const client = connect('mqtt://78.47.164.96:9001');
      client.on("connect", function() {
        console.log("connected");
        client.subscribe("Alarm1", function(err) {
          if (!err) {
            //client.publish("Alarm1", "Hello mqtt");
          }
        });
        //client.publish("Alarm1", "test message");
      });

      client.on("message", (topic, message) => {
         self.addLink();
        document.getElementById("AlarmP").innerHTML = topic;
        console.log('value of fun =', self.fun);
        console.log(message.toString());
        return message;
      });
    },



    addLink: function() {
      this.ADD_LINK(this.newLink);
      this.newLink = "hj";
      
    },

    testclick: function() {
      this.addLink();
      console.log("testclick fired");
      return this.newLink;
    }
  },

  mounted() {
    this.init();
  },

  watch: {
    fun: function(val) {
      console.log('inside watch', val);
    }
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

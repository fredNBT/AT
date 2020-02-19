<template>
  <div>
    <h3>todos</h3>
    <button @click="testclick">test</button>

    <div class="todos">
      <div v-for="todo in allTodos" v-bind:key="todo.id" class="todo">
        {{todo.title}}
        <i
          @click="deleteTodo(todo.id)"
          class="fas fa-clock"
          style="font-size:20px;color:lightblue;text-shadow:2px 2px 4px #000000;"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

//client.onMessageArrived = onMessageArrived;

export default {
  name: "Todos",
  methods: {
    ...mapActions(["fetchTodos", "deleteTodo",]),
    testclick() {
      var mqtt = require("mqtt");
      var client = mqtt.connect("mqtt://78.47.164.96:9001");
client.on("connect", function() {
console.log("connected");
client.subscribe("Alarm1", function(err) {
        if (!err) {
            client.publish("Alarm1", "Hello mqtt");
          }
        });
        client.publish("Alarm1", "test message");
        client.on("message", function(topic, message) {
          // message is Buffer
        console.log(message.toString());        
        });
      });
    },
    ...mapMutations(['ADD_ALARM']),
  },
  computed: {
    ...mapGetters(["allTodos"]),
    ...mapState(['Alarms'])

  },
  created() {
    this.fetchTodos();
  }
};

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
}

function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("Alarm1");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}
</script>

<style scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}
.todo {
  border: 1px solid #ccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}
</style>

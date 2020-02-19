import axios from 'axios'

//  var mqtt = require("mqtt");
//  var client = mqtt.connect("mqtt://78.47.164.96:9001");
// client.on("connect", function() {
//     console.log("connected");
//     client.subscribe("Alarm1", function(err) {
//    if (!err) {
//        client.publish("Alarm1", "Hello mqtt");
//      }
//    });




const state = {
    todos: [],
    Alarms: []
};

const getters = {
    allTodos: state => state.todos,
    allAlarms: state => state.Alarms
};

const actions = {
    async  fetchTodos({ commit }){
        const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
        );

        commit('setTodos', response.data);
    }, 
    async AddTodo({commit}, title){
        const response = await axios.post( 'https://jsonplaceholder.typicode.com/todos', {title, 
        completed:false });
        commit('newTodo', response.data);
    },
    async deleteTodo({commit}, id){
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos({commit}, e){
        const limit = parseInt(e.target.options[e.target.options.selectedIndex]);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos ),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo:(state,id) => state.todos = state.todos.filter(todo => todo.id !== id),
    ADD_ALARM: (state, alarm ) => {
        state.Alarms.push(alarm)
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};


<template>
  <div>
 <v-client-table 
          :columns='columns'
          :data="drones">
          <div slot="actions" slot-scope="{ row }">
             <button v-on:click="GoToMapPage(row.id)">Details</button>
    </div>
  </v-client-table>
  </div>
</template>
<script>
 import axios from 'axios';

export default {
  name: 'app',
  props:['headers'],
  data() {
    return {
      drones: [],
      columns:['id','Name','Description','Region','LastOrder',"actions"],
    }
  },
  methods: {    
      GoToMapPage: function(RowNumber){
      this.$emit('GoToMap', RowNumber)
      }
  },
  async created() {
    try {
      const res = await axios.get('http://localhost:8000/drones/')
      this.drones = Object.entries(JSON.parse(res.data));
    } catch(e) {
      console.error(e)
      const res = await axios.get('http://localhost:8000/drones/')
      let stringy = JSON.stringify(res.data)
      //console.log(stringy)
      this.drones = JSON.parse(stringy)
      console.log(this.drones)
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  width: 95%;
  margin-top: 50px; 
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
</style>

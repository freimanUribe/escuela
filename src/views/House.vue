<template>
  <div>
    <!--select house -->
    <v-container>
      <v-select :items="houses" v-model="house" label="Author" @change="listHouse"></v-select>
    </v-container>
    <!--tables house -->
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>HOUSE {{house}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!--search -->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
        </v-toolbar>
      </template>
      <!--image -->
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" width="50" />
      </template>
      <!-- boton reset table-->
      <template v-slot:no-data>
        <v-btn color="primary" @click="listHouse">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  //import axios
  import axios from 'axios'
  export default {
    name: 'House',

    data: () => ({
      //variable general
      search: '',
      houses: ['slytherin', 'gryffindor', 'ravenclaw', 'hufflepuff'],
      house: null,
      //header table 
      headers: [{
          text: 'image',
          value: 'image',
          sortable: false,
        },
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Age',
          value: 'age'
        },
        {
          text: 'Patronus',
          value: 'patronus'
        }
      ],

      //body table
      desserts: [],
    }),

    methods: {
      //function list house
      listHouse() {
        const me = this;
        me.desserts = [];
        axios.get(`http://hp-api.herokuapp.com/api/characters/house/${me.house}`)
          .then(function (response) {
            // handle success
            response.data.forEach(item => {
              let edad = {
                age: 'N/A'
              }
              if (item.yearOfBirth) {
                edad.age = (new Date().getFullYear()) - (item.yearOfBirth)
              }
              if (!item.patronus || item.patronus == '') {
                item.patronus = 'No Tiene.'
              }
              const object = Object.assign(item, edad);
              me.desserts.push(object)
            })

          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {});
      },
    },
  }
</script>
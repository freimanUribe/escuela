<template>
  <div>
  <!-- table teacher-->
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>TEACHER</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          >
          </v-text-field>
        </v-toolbar>
      </template>
      <!--image teacher -->
      <template v-slot:item.image="{ item }">
       <v-img @click="gallery = !gallery" :src="item.image" width="50" />
      </template>
      <!--boton reset table -->
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//import axios
import axios from "axios";
export default {
  name: "Teacher",

  data: () => ({
    //variable general
    search: "",
    dialog: false,
    dialogDelete: false,
    //header table
    headers: [
      {
        text: "image",
        value: "image",
        sortable: false,
      },
      {
        text: "Name",
        value: "name",
      },
      {
        text: "Age",
        value: "age",
      },
      {
        text: "Patronus",
        value: "patronus",
      },
    ],
    //body table
    desserts: [],
  }),

  created() {
    //initialize table - data
    this.initialize();
  },

  methods: {
    //function initialize
    initialize() {
      const me = this;
      axios
        .get("http://hp-api.herokuapp.com/api/characters/staff")
        .then(function(response) {
          // handle success
          response.data.forEach((item) => {
            let edad = {
              age: "N/A",
            };
            if (item.yearOfBirth) {
              edad.age = new Date().getFullYear() - item.yearOfBirth;
            }
            if (!item.patronus || item.patronus == "") {
              item.patronus = "No Tiene.";
            }
            const object = Object.assign(item, edad);
            me.desserts.push(object);
          });
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },
  },
};
</script>

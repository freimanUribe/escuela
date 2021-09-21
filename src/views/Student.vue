<template>
  <div>
  <!-- taable-->
    <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
        <!--filter -->
          <v-toolbar-title>ESTUDIANTES CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-btn color="primary" dark class="mb-2" @click="dialog = !dialog">
            New Student
          </v-btn>
          <v-spacer></v-spacer>
          <!--search-->
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
          </v-text-field>
          <!-- modal Create/edit -->
          <v-dialog v-model="dialog" persistent max-width="900px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                <!--form -->
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.species" label="Species"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.gender" label="Gender"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.house" label="House"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-dialog ref="dialog" v-model="modalData" :return-value.sync="editedItem.dateOfBirth" persistent width="290px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="editedItem.dateOfBirth" label="Picker in dialog" prepend-icon="mdi-calendar" readonly
                            v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="editedItem.dateOfBirth" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modalData = false">
                            Cancel
                          </v-btn>
                          <v-btn text color="primary" @click="$refs.dialog.save(editedItem.dateOfBirth)">
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                    
                    <v-col cols="12" sm="6">
                      <v-text-field type="number" v-model="editedItem.yearOfBirth" label="Year Of Birth" disabled></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.ancestry" label="Ancestry"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.eyeColour" label="Eye Colour"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.hairColour" label="Hair Colour"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.wand.wood" label="Wood"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.wand.core" label="Core"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="number" v-model="editedItem.wand.length" label="Length"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.patronus" label="Patronus"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-switch v-model="editedItem.hogwartsStudent" label="Hogwarts Student"></v-switch>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-switch v-model="editedItem.hogwartsStaff" label="Hogwarts Staff"></v-switch>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field type="text" v-model="editedItem.actor" label="Actor"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-switch v-model="editedItem.alive" label="Alive"></v-switch>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field v-model="editedItem.image" label="Image(URL)"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!--modal confirmation delete -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Estas seguro que deseas eliminar el Alumno?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!--image table -->
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" width="50" />
      </template>
      <!--botons actions -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <!-- boton reset table -->
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
//llamdo axios
  import axios from "axios";
  export default {
    name: "Student",
    
    data: () => ({
      //variables generales
      search: "",
      dialog: false,
      modalData:false,
      dialogDelete: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      //table header
      headers: [{
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
        {
          text: "Accion",
          value: "actions",
          sortable: false,
        },
      ],
      //table body
      desserts: [],
      //variables formulario
      editedIndex: -1,
      editedItem: {
        name: '',
        age: 0,
        species: '',
        gender: '',
        house: '',
        dateOfBirth: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        yearOfBirth: 0,
        ancestry: '',
        eyeColour: '',
        hairColour: '',
        wand: {
          wood: '',
          core: '',
          length: 0,
        },
        patronus: '',
        hogwartsStudent: null,
        hogwartsStaff: null,
        actor: '',
        alive: null,
        image: '',
      },
      defaultItem: {
        name: '',
        age: 0,
        species: '',
        gender: '',
        house: '',
        dateOfBirth: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        yearOfBirth: 0,
        ancestry: '',
        eyeColour: '',
        hairColour: '',
        wand: {
          wood: '',
          core: '',
          length: 0,
        },
        patronus: '',
        hogwartsStudent: null,
        hogwartsStaff: null,
        actor: '',
        alive: null,
        image: '',
      },
    }),

    computed: { 
      //function filter
      formTitle() {
        return this.editedIndex === -1 ? "New Student" : "Edit Student";
      },
    },

    watch: {
      // close modals
      dialog(val) {
        val || this.close();
      },
      dialogDelete(val) {
        val || this.closeDelete();
      },
    },

    created() {
      //initialize table
      this.initialize();
    },

    methods: {
      //function initialize
      initialize() {
        const me = this;
        axios
          .get("http://hp-api.herokuapp.com/api/characters/students")
          .then(function (response) {
            // handle success
            response.data.forEach((item) => {
              let edad = {
                age: "N/A",
              };
              let dia = item.dateOfBirth.substr(0, 2);
              let mes = item.dateOfBirth.substr(3,2);
              let anno = item.dateOfBirth.substr(6,4);
              item.dateOfBirth= `${anno}-${mes}-${dia}`;

              if (item.yearOfBirth) {
                edad.age = (new Date().getFullYear()) - (item.yearOfBirth);
              }
              if (!item.patronus || item.patronus == "") {
                item.patronus = "No Tiene.";
              }
              const object = Object.assign(item, edad);
              me.desserts.push(object);
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
      },

      //function edit / open modal edit
      editItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      //function delete/ open modal Confirm delete
      deleteItem(item) {
        this.editedIndex = this.desserts.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogDelete = true;
      },

      //confirm delete
      deleteItemConfirm() {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
      },

      //clsose dialog edit/Create
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      // close modal delete confirm
      closeDelete() {
        this.dialogDelete = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },

      //save edit/create
      save() {
        if (this.editedIndex > -1) {
          this.editedItem.yearOfBirth = this.editedItem.dateOfBirth.substr(0, 4);
          this.editedItem.age = (new Date().getFullYear()) - (this.editedItem.yearOfBirth);
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
        } else {
          this.editedItem.yearOfBirth = this.editedItem.dateOfBirth.substr(6, 4);
          this.editedItem.age = (new Date().getFullYear()) - (this.editedItem.yearOfBirth);
          this.desserts.push(this.editedItem);
        }
        alert('Se guardo el cambio en la tabla!')
        this.close();
      },
    },
  };
</script>
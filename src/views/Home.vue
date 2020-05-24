<template>
  <v-data-table
    :headers="headers"
    :items="studens"
    sort-by="register"
    class="elevation-1"
    locale="pt-BR"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>GRUPO A</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="">
            <router-link to="/register">
              <v-btn color="primary" dark class="mb-2" >Cadastrar aluno</v-btn>
            </router-link>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.register" label="Registro Acadêmico"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.document" label="CPF"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">

      <router-link :to="{ name:'Edit', params: { id: item.register }}" id="link">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </router-link>

      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  import controller from "../server/api"

  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Registro Acadêmico',
          align: 'start',
          sortable: false,
          value: 'register',
        },
        { text: 'Nome', value: 'name' },
        { text: 'CPF', value: 'document' },
        { text: 'Ação', value: 'actions', sortable: false },
      ],
      studens: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        register: 0,
        document: 0,
      },
      defaultItem: {
        name: '',
        register: 0,
        document: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        controller.getStudents()
          .then(success => {
            this.studens = success.data;
          }).catch(err => {
            alert('Ops')
          })
      },

      editItem (item) {
        this.editedIndex = this.studens.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.studens.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.studens.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.studens[this.editedIndex], this.editedItem)
        } else {
          this.studens.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style scoped>
  #link {
    text-decoration:none;
  }
</style>
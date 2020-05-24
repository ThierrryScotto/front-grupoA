<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="student.name"
        :counter="10"
        :rules="nameRules"
        label="Nome"
        required
      ></v-text-field>

      <v-text-field
        v-model="student.lastName"
        :counter="10"
        :rules="lastNameRules"
        label="Sobrenome"
        required
      ></v-text-field>

      <v-text-field
        type="number"
        v-model="student.document"
        :counter="11"
        :rules="documentRules"
        label="CPF"
        required
      ></v-text-field>

      <v-text-field
        v-model="student.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-select
        v-model="student.select"
        :items="sex"
        :rules="[v => !!v || 'Este campo é obrigatório']"
        label="Sexo"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="create"
      >
        Criar
      </v-btn>

      <router-link to="/" id="link">
      <v-btn
        color="warning"
        @click="resetValidation"
      >
        Cancelar
      </v-btn>
      </router-link>
    </v-form>
  </v-container>
</template>

<script>
import controller from "../server/api"

  export default {
    data: () => ({
      valid: true,
      student: {
        name: '',
        lastName: '',
        document: '',
        email: '',
        select: null,
      },
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 10) || 'Name deve ser válido',
      ],
      lastNameRules: [
        v => !!v || 'Sobrenome é obrigatório',
        v => (v && v.length <= 10) || 'Sobrenome deve ser válido',
      ],
      documentRules: [
        v => !!v || 'CPF é obrigatório',
        v => (v && v.length <= 11) || 'CPF deve ser válido',
      ],
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      sex: [
        'Masculino',
        'Feminino',
      ],
    }),

    methods: {
      create () {
        if (!this.student.name)
          this.checkFields('nome')
        else if (!this.student.lastName)
          this.checkFields('sobrenome')
        else if (!this.student.document)
          this.checkFields('CPF')
        else if (!this.student.email)
          this.checkFields('email')
        else if (!this.student.select)
          this.checkFields('sexo')
        else {
          this.cleanField();
          controller.registerStudent(this.student);
          alert('Usuário criado com sucesso')
        }
        
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      checkFields (field) {
        alert(`O campo ${field} é pbrigatório`)
      },
      cleanField() {
        this.$refs.form.reset()
      }
    },
  }
</script>

<style scoped>
  #link {
    text-decoration:none;
  }
</style>
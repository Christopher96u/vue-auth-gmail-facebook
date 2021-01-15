<template>
<v-app>
  <loader v-if="dialog.value ===true"></loader>
  <v-container>
    <h1 class="green--text text-center my-12 yellow">LoginView</h1>
    <p class="text-center" v-if="user">Hola {{user}}</p>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title v-if="!isRegisterCard" class="justify-center display-1 success">
            Login
          </v-card-title>
          <v-card-title v-if="isRegisterCard" class="justify-center display-1 primary" >
            Register
          </v-card-title>
          <v-card-subtitle class="text-center py-4">Choose Google or Facebook</v-card-subtitle>
          <v-card-actions>
            <v-btn block color="error" @click="onSignInGoogle">
              <v-icon dark left>mdi-google</v-icon>
              Gmail
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn block color="info" @click="onSignInFacebook">
              <v-icon dark left>mdi-facebook</v-icon>
              Facebook
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center mt-6">
            <v-btn outlined color="indigo" v-if="!isRegisterCard" @click="isRegisterCard = !isRegisterCard" elevation="3">¿No tienes una cuenta? ¡Regístrate aquí!</v-btn>
            <v-btn outlined color="indigo" v-if="isRegisterCard" @click="isRegisterCard = !isRegisterCard" elevation="3">¿Ya tienes una cuenta? ¡Inicia Sesión!</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</v-app>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
import Loader from "@/components/Loader";
export default {
name: "Login",
components:{
  Loader
},
computed:{
  ...mapState(['dialog']),
  ...mapGetters({
    user: 'user'
  })
},
methods:{
  ...mapActions(['signUserInGoogle', 'signUserInFacebook']),
  onSignInGoogle(){
    this.signUserInGoogle()
  },
  onSignInFacebook(){
    this.signUserInFacebook()
  }
},
data(){
  return{
    isRegisterCard: false
  }
}
}
</script>

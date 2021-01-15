<template>
  <v-app>
    <h1 class="black--text text-center my-12 grey">HomeView</h1>
    <h3>Bienvenido {{user}}</h3>
  </v-app>
</template>

<script>

import {mapGetters} from "vuex";

export default {

  name: 'Home',
  components: {

  },
  computed:{
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>

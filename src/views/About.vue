<template>
  <v-app>
    <h1 class="blue-grey--text text-center my-12 brown">AboutView</h1>
    <h3>About {{user}} </h3>
  </v-app>
</template>


<script>
import {mapGetters} from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>

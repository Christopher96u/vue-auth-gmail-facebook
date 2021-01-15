<template>

  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary v-if="user">
      <v-list-item class="mt-6 mb-2">
        <v-list-item-avatar>
          <v-img :src="user.photoUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark fixed>
      <v-app-bar-nav-icon @click="openNavigationDrawer" v-if="user"></v-app-bar-nav-icon>
      <v-toolbar-title>Login Project</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="secondary" :to="{name: 'Home'}">
        Home
      </v-btn>
      <v-btn color="primary" :to="{name: 'Login'}" class="mx-4" v-if="!user">
        Login
      </v-btn>
      <v-btn color="accent" :to="{name: 'About'}">
        About
      </v-btn>
      <v-btn icon @click="onSignOut" v-if="user">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>


    <v-main>

      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions(['signOut']),
    onSignOut(){
      this.signOut()
    },
    openNavigationDrawer(){
      this.drawer = !this.drawer
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data(){
    return{
      drawer :false,
      items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: {
            name: 'Home'
          }
        },
        {
          title: 'About',
          icon: 'mdi-electron-framework',
          to: {
            name: 'About'
          }
        },
        {
          title: 'Profile',
          icon: 'mdi-account',
          to: {
            name: 'Profile'
          }
        }
      ]
    }
  }
}
</script>
<style scoped>
/*
    Vuetify by default doesnt change this classes when a link was openend
*/
.v-list-item--link:before{
  background-color: white ;
}
.v-list-item--link:hover{
  background-color: gray ;
}
</style>


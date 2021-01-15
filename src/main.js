import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "@/plugins/vuetify"
import {auth} from "@/plugins/firebase"

Vue.config.productionTip = false

 auth.onAuthStateChanged((user) =>{
  if(user){
    /*this.$store.dispatch('autoSignIn', user)*/
    store.dispatch('autoSignIn').then()
  }
  new Vue({
    router,
    store,
    vuetify,
    render: function (h) { return h(App) }
  }).$mount('#app')
})



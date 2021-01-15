import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls" // library for encrypting data stored in localStorage
const ls = new SecureLS({ isCompression: false })
import {firebase, auth, db, storage} from '@/plugins/firebase'
import router from "@/router"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    dialog: {
      title: '',
      value: false
    },
    user: null,
    file : null
    /*
    * user :  {
        id: '',
        name: '',
        email: '',
        photoUrl: ''
            } */
  },
  mutations: {
    setLoader(state, payload){
      state.dialog.title = payload.title
      state.dialog.value = payload.value
    },
    setUser(state, payload){
      state.user = payload
    },
    setImageUrl(state, payload){
      state.user.photoUrl = payload.photoUrl
    },
    setImage(state, payload){
      state.file = payload
    }
  },
  actions: {
    signUserInGoogle({dispatch, commit}){
      commit('setLoader',{title: 'Iniciando sesión con Google', value: true})
      firebase.auth().languageCode = 'es'
       const provider = new firebase.auth.GoogleAuthProvider()
       dispatch('login',provider)
    },
    async login({commit, dispatch},provider){
       try {
         const result = await firebase.auth().signInWithPopup(provider)
         const user = result.user
         console.log(user)
         const userExist = await db.collection('users').doc(user.uid).get()
         if(userExist.exists){
           commit('setUser',userExist.data())
           console.log('el usuario SI estaba en la BD, es usuario antiguo')
           await router.push({name: 'Home'})
         }
         else {
           // build an user
           const loggedUser = {
             id: user.uid,
             name: user.displayName,
             email: user.email,
             photoUrl: user.photoURL
           }
           await db.collection('users').doc(loggedUser.id).set(loggedUser)
           console.log('el usuario NO estaba registrado, ahora si lo esta en la BD')
           commit('setUser',loggedUser)
           await router.push({name: 'Home'})
         }
       } catch (error){
         console.log(error.message)
       } finally {
         commit('setLoader',{title: '', value: false})
       }
    },
    async signUserInFacebook({dispatch, commit}){
      commit('setLoader',{title: 'Iniciando sesión con Facebook', value: true})
      firebase.auth().languageCode = 'es'
      const provider = new firebase.auth.FacebookAuthProvider()
      dispatch('login',provider)
    },
     async autoSignIn({commit, getters}){
      try{
        commit('setLoader',{title: 'Ejecutando auto-login', value: true})
        const user = getters.user
        const userExist = await db.collection('users').doc(user.uid).get()
        if(userExist.exists){
          commit('setUser',userExist.data())
          console.log('trayendo datos de la BD Firestore')
        }
      } catch (e){
        console.log(e.message)
      }
      finally {
        commit('setLoader',{title: '', value: false})
      }
    },
     async signOut({commit}){
      try {
        await auth.signOut()
        commit('setUser',null)
        await router.push({name : 'Login'})
      } catch (error) {
        console.log(error.message)
      }
    },
    async uploadImage({commit, getters}){
      let user = getters.user
      let file = getters.getFile
      commit('setLoader',{title: 'Subiendo imagen a Firebase', value: true})
      try {
        const imageRef = storage.ref().child(user.email).child('ProfilePhoto')
        const response = await imageRef.put(file)
        const photoUrl = await imageRef.getDownloadURL()
        user.photoUrl = photoUrl
        //  we store the new photo in FireStore
        await db.collection('users').doc(user.id).update({
          photoUrl: photoUrl
        })
        console.log(response)
      } catch (e) {
        console.log(e.message)
      } finally {
        commit('setLoader',{title: '', value: false})
      }
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
      paths:['user','dialog','file']
    })],
  getters: {
    user (state) {
      return state.user
    },
    getFile(state){
      return state.file
    }
  },
})



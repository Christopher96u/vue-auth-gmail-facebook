import  firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgbDCwQr4AYGA1iRndJnxTCb8knVPIf8M",
    authDomain: "vue-login-facebook.firebaseapp.com",
    projectId: "vue-login-facebook",
    storageBucket: "vue-login-facebook.appspot.com",
    messagingSenderId: "796240813415",
    appId: "1:796240813415:web:fa0cb2e547127a656823c2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// Initialize services that we'll use...
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {firebase, db, auth, storage}
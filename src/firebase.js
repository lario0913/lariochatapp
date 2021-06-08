import firebase from 'firebase/app'
import 'firebase/auth'

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCYK1fCg6K0yR0LSLUCabvAQcitul9APRE",
    authDomain: "lariochat.firebaseapp.com",
    projectId: "lariochat",
    storageBucket: "lariochat.appspot.com",
    messagingSenderId: "968991201336",
    appId: "1:968991201336:web:2df8b7e29105d406792ecd"
}).auth()

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDj5uoyqnCvddit3QIbBVS-tvtjraUH-KA',
  authDomain: 'music-ba228.firebaseapp.com',
  projectId: 'music-ba228',
  storageBucket: 'music-ba228.appspot.com',
  appId: '1:468589485749:web:48a5626ef7a1bdf9aea8fc'
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()

const userCollection = db.collection('users')

export { auth, db, userCollection }

import { defineStore } from 'pinia'

import { auth, userCollection } from '@/includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async createUser(values) {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        values.userEmail,
        values.password
      )
      await userCollection.doc(userCredentials.user.uid).set({
        name: values.userName,
        email: values.userEmail,
        age: values.userAge,
        country: values.userCountry
      })
      this.userLoggedIn = true
    },
    async authenticateUser(values) {
      await auth.signInWithEmailAndPassword(values.userEmailId, values.userPassword)
      this.userLoggedIn = true
    },
    async logOutUser() {
      await auth.signOut()
      this.userLoggedIn = false
    }
  }
})

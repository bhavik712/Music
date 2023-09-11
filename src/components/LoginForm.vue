<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="showLogInStatus"
    :class="logInStatusClass"
  >
    {{ logInStatus }}
  </div>

  <vee-form @submit="authenticate">
    <!-- Email -->
    <div class="mb-3">
      <form-input :fieldProperties="userEmailField"></form-input>
    </div>

    <!-- Password -->
    <div class="mb-3">
      <form-input :fieldProperties="passwordField"></form-input>
    </div>

    <!-- Submit button -->
    <form-button :fieldProperties="submitButton"></form-button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/users.js'
import FormInput from './FormComponents/FormInput.vue'
import FormButton from './FormComponents/FormButton.vue'
import jsonData from '@/UserData.json'
export default {
  name: 'LoginForm',
  data() {
    return {
      loginFields: jsonData.loginFields,
      isStatusShown: false,
      isLoginFormSubmitted: false,
      showLogInStatus: false,
      logInStatusClass: 'bg-blue-600',
      logInStatus: 'Processing',

      submitButton: {
        type: 'submit',
        class:
          'block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700',
        text: 'Submit',
        isDisabled: this.isLoginFormSubmitted
      }
    }
  },

  computed: {
    userEmailField() {
      return this.loginFields.userEmailField
    },
    passwordField() {
      return this.loginFields.passwordField
    }
  },

  methods: {
    ...mapActions(useUserStore, ['authenticateUser', 'getCurrentUserData']),

    async authenticate(values) {
      this.showLogInStatus = true
      this.isLoginFormSubmitted = true
      this.logInStatusClass = 'bg-blue-600'
      this.logInStatus = 'validating'

      try {
        await this.authenticateUser(values)
      } catch (error) {
        this.showLogInStatus = true
        this.isLoginFormSubmitted = false
        this.logInStatusClass = 'bg-red-600'
        this.logInStatus = 'Login Data Invalid'
        console.log(error)
        return
      }
      this.logInStatusClass = 'bg-green-600'
      this.logInStatus = 'Log In SucessFull'
      this.getCurrentUserData()
      setTimeout(() => this.$router.push({ name: 'home' }), 750)
    }
  },
  components: {
    FormInput,
    FormButton
  }
}
</script>

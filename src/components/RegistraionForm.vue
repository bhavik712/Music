<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="regShowStatus"
    :class="regShowStatusClass"
  >
    {{ regStatus }}
  </div>
  <vee-form @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <form-input :fieldProperties="userRegName"></form-input>
    </div>

    <!-- Email -->
    <div class="mb-3">
      <form-input :fieldProperties="userRegEmail"></form-input>
    </div>

    <!-- Age -->
    <div class="mb-3">
      <form-input :fieldProperties="userRegAge"></form-input>
    </div>

    <!-- password & confirm password  -->
    <form-input-password></form-input-password>

    <!-- Country -->
    <div class="mb-3">
      <form-select :fieldProperties="userRegCountry"></form-select>
    </div>

    <!-- TOS -->
    <div class="mb-3">
      <form-checkbox :fieldProperties="userRegTnC"></form-checkbox>
    </div>

    <!-- submit button -->
    <form-button :isDisabled="regFormSubmission"></form-button>
  </vee-form>
</template>

<script>
// import { auth, userCollection } from '@/includes/firebase.js'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/users.js'
import FormInput from './FormComponents/FormInput.vue'
import FormInputPassword from './FormComponents/FormInputPassword.vue'
import FormSelect from './FormComponents/FormSelect.vue'
import FormCheckbox from './FormComponents/FormCheckbox.vue'
import FormButton from './FormComponents/FormButton.vue'
import jsonData from '@/UserData.json'

export default {
  name: 'RegistrationForm',

  components: {
    FormInput,
    FormInputPassword,
    FormSelect,
    FormCheckbox,
    FormButton
  },

  data() {
    return {
      regFields: jsonData.regFields,

      regFormSubmission: false,
      regShowStatus: false,
      regShowStatusClass: 'bg-blue-600',
      regStatus: 'Your acoount is being created..',

      userData: {
        userCountry: 'USA'
      }
    }
  },
  computed: {
    userRegName() {
      return this.regFields.userRegName
    },
    userRegEmail() {
      return this.regFields.userRegEmail
    },
    userRegAge() {
      return this.regFields.userRegAge
    },
    userRegCountry() {
      return this.regFields.userRegCountry
    },
    userRegTnC() {
      return this.regFields.userRegTnC
    }
  },
  methods: {
    ...mapActions(useUserStore, ['createUser']),

    async register(values) {
      this.regShowStatus = true
      this.regFormSubmission = true
      this.regShowStatusClass = 'bg-blue-600'
      this.regStatus = 'Your acoount is being created..'

      let userCredentials = null
      try {
        await this.createUser(values)
      } catch (error) {
        console.log(error)
        this.regFormSubmission = false
        this.regShowStatusClass = 'bg-red-500'
        this.regStatus = 'some unexpected error occur. Try again later'
        return
      }

      this.regShowStatusClass = 'bg-green-600'
      this.regStatus = 'sucess your account has been created & You are Logged in'

      console.log(userCredentials)
      window.location.reload()
    }
  }
}
</script>

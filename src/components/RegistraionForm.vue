<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="rulesSchema" @submit="register" :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        name="userName"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <error-message class="text-red-600" name="userName" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="userEmail"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="userEmail" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        name="userAge"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <error-message class="text-red-600" name="userAge" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        name="confirmation"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <error-message class="text-red-600" name="confirmation" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        as="select"
        name="userCountry"
        placeholder="select your contry"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Canada">Canada</option>
      </vee-field>
      <error-message class="text-red-600" name="userCountry" />
    </div>
    <!-- TOS -->
    <div class="mb-1 pl-6">
      <vee-field
        name="tnc"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="1"
      />
      <label class="inline-block">Accept terms of service</label>
    </div>
    <error-message class="text-red-600" name="tnc" />
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
// import { auth, userCollection } from '@/includes/firebase.js'
import { mapActions } from 'pinia'
import useUserStore from '@/stores/users.js'

export default {
  name: 'RegistrationForm',

  data() {
    return {
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-600',
      reg_alert_msg: 'Your acoount is being created..',

      rulesSchema: {
        userName: 'requiredField|minFieldLength: 3|maxFieldLength: 20|alphaSpaces',
        userEmail: 'requiredField|validateEmail',
        userAge: 'requiredField|minFieldValue:18|maxFieldValue:130',
        password: 'requiredField|minFieldLength:8|maxFieldLength:12|alphaNum',
        confirmation: 'requiredField|confirmPassword:@password',
        userCountry: 'requiredField|excluded:Canada',
        tnc: 'requiredField'
      },

      userData: {
        userCountry: 'USA'
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['createUser']),

    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-600'
      this.reg_alert_msg = 'Your acoount is being created..'

      let userCredentials = null
      try {
        await this.createUser(values)
      } catch (error) {
        console.log(error)
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'some unexpected error occur. Try again later'
        return
      }

      this.reg_alert_variant = 'bg-green-600'
      this.reg_alert_msg = 'sucess your account has been created'

      console.log(userCredentials)
    }
  }
}
</script>

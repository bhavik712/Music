<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="auth_show_alert"
    :class="auth_alert_variant"
  >
    {{ auth_alert_msg }}
  </div>
  <vee-form :validation-schema="logInSchema" @submit="authenticate">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="userEmailId"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <error-message class="text-red-600" name="userEmailId" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="userPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <error-message class="text-red-600" name="userPassword" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="auth_in_submission"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      auth_in_submission: false,
      auth_show_alert: false,
      auth_alert_variant: 'bg-blue-600',
      auth_alert_msg: 'Processing',

      logInSchema: {
        userEmailId: 'requiredField|validateEmail',
        userPassword: 'requiredField|minFieldLength:8|maxFieldLength:12|alphaNum'
      }
    }
  },

  methods: {
    authenticate(values) {
      this.auth_show_alert = true
      this.auth_in_submission = true
      this.auth_alert_variant = 'bg-blue-600'
      this.auth_alert_msg = 'validating'
      this.auth_alert_variant = 'bg-green-600'
      this.auth_alert_msg = 'Values stored'
      console.log(values)
    }
  }
}
</script>

<template>
  <main>
    <div class="fixed z-10 inset-0 overflow-y-auto" id="modal">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <!-- Add margin if you want to see some of the overlay behind the modal-->
          <div class="py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-4">
              <p class="text-2xl font-bold">Your Account</p>
              <!-- Modal Close Button -->
              <router-link :to="{ name: 'home' }">
                <div class="modal-close cursor-pointer z-50">
                  <i class="fas fa-times"></i>
                </div>
              </router-link>
            </div>

            <!-- Tabs -->
            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  @click="this.is_selected = 'Login'"
                  :class="{
                    'hover:text-white text-white bg-blue-600': is_selected === 'Login',
                    'hover:text-blue-600': is_selected === 'Register'
                  }"
                  >Login</a
                >
              </li>
              <li class="flex-auto text-center" @click="this.is_selected = 'Register'">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  :class="{
                    'hover:text-white text-white bg-blue-600': is_selected === 'Register',
                    'hover:text-blue-600': is_selected === 'Login'
                  }"
                  >Register</a
                >
              </li>
            </ul>

            <!-- Login Form -->
            <login-form v-if="is_selected === 'Login'"> </login-form>

            <!-- Registration Form -->
            <registration-form v-if="is_selected === 'Register'"></registration-form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/model'
import LoginForm from './LoginForm.vue'
import RegistrationForm from './RegistraionForm.vue'

export default {
  name: 'UserAuthentication',
  components: {
    LoginForm,
    RegistrationForm
  },
  data() {
    return {
      is_selected: 'Login'
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  methods: {}
}
</script>

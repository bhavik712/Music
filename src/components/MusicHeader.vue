<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'about' }">About</router-link>
          </li>
          <li v-if="!userLoggedIn">
            <router-link
              class="px-2 text-white"
              :to="{ name: 'authentication' }"
              @click.prevent="showAuthentication"
              >Login / Register</router-link
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <router-link
                class="px-2 text-white"
                :to="{ name: 'home' }"
                @click.prevent="logOut"
                exact-active-class="no-active"
                >log out</router-link
              >
              <!-- <a class="px-2 text-white" href="#" >Log Out</a> -->
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapWritableState, mapState, mapActions } from 'pinia'
import useModelStore from '@/stores/model'
import useUserStore from '@/stores/users'

export default {
  name: 'MusicHeader',
  computed: {
    ...mapWritableState(useModelStore, ['isHidden']),
    ...mapState(useUserStore, ['userLoggedIn'])
  },
  methods: {
    showAuthentication() {
      this.isHidden = !this.isHidden
    },
    ...mapActions(useUserStore, ['logOutUser']),
    async logOut() {
      try {
        await this.logOutUser()
      } catch (error) {
        console.log(error)
        return
      }
    }
  }
}
</script>

<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="showAuthentication"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" href="#">Manage</a>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="logOut">Log Out</a>
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
      window.location.reload()
    }
  }
}
</script>

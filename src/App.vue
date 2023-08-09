<template>
  <!-- Header -->
  <music-header> </music-header>
  <router-view></router-view>
  <music-player></music-player>
  <!-- Auth Modal -->
  <user-authentication> </user-authentication>
</template>

<script>
import { auth } from '@/includes/firebase.js'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/users.js'
import MusicPlayer from './components/MusicPlayer.vue'
import MusicHeader from './components/MusicHeader.vue'
import UserAuthentication from './components/UserAuthentication.vue'

export default {
  name: 'app',
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  },

  components: {
    MusicHeader,
    UserAuthentication,
    MusicPlayer
  }
}
</script>

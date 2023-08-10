<template>
  <!-- Header -->
  <music-header> </music-header>
  <router-view></router-view>
  <music-player></music-player>
</template>

<script>
import { auth } from '@/includes/firebase.js'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/users.js'
import MusicPlayer from './components/MusicPlayer.vue'
import MusicHeader from './components/MusicHeader.vue'

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
    MusicPlayer
  }
}
</script>

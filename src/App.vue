<template>
  <!-- Header -->
  <music-header> </music-header>

  <!-- Introduction -->
  <music-introduction></music-introduction>
  <!-- Main Content -->
  <music-content></music-content>

  <!-- Player -->
  <music-player></music-player>
  <!-- Auth Modal -->
  <user-authentication> </user-authentication>
</template>

<script>
import { auth } from '@/includes/firebase.js'
import { mapWritableState } from 'pinia'
import useUserStore from '@/stores/users.js'

import MusicHeader from './components/MusicHeader.vue'
import UserAuthentication from './components/UserAuthentication.vue'
import MusicIntroduction from './components/MusicIntroduction.vue'
import MusicContent from './components/MusicContent.vue'
import MusicPlayer from './components/MusicPlayer.vue'

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
    MusicIntroduction,
    MusicContent,
    MusicPlayer
  }
}
</script>

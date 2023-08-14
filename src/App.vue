<template>
  <!-- Header -->
  <music-header> </music-header>
  <router-view></router-view>
  <music-player></music-player>
</template>

<script>
import { auth } from '@/includes/firebase.js'
import { mapWritableState, mapActions } from 'pinia'
import useUserStore from '@/stores/users.js'
import MusicPlayer from './components/MusicPlayer.vue'
import MusicHeader from './components/MusicHeader.vue'

export default {
  name: 'app',
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  methods: {
    ...mapActions(useUserStore, ['getCurrentUserData'])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
      this.getCurrentUserData()
    }
  },

  components: {
    MusicHeader,
    MusicPlayer
  }
}
</script>

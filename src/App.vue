<template>
  <!-- Header -->
  <music-header> </music-header>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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
<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.25s linear;
}

.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}
</style>

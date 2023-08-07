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
import MusicHeader from './components/MusicHeader.vue'
import UserAuthentication from './components/UserAuthentication.vue'
import MusicIntroduction from './components/MusicIntroduction.vue'
import MusicContent from './components/MusicContent.vue'
import MusicPlayer from './components/MusicPlayer.vue'

export default {
  name: 'app',

  components: {
    MusicHeader,
    UserAuthentication,
    MusicIntroduction,
    MusicContent,
    MusicPlayer
  }
}
</script>

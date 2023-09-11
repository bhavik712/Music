<template>
  <main>
    <!-- Introduction -->
    <music-introduction></music-introduction>
    <!-- Main Content -->
    <music-content></music-content>
  </main>
</template>
<script>
import MusicIntroduction from '@/components/MusicIntroduction.vue'
import MusicContent from '@/components/MusicContent.vue'

export default {
  name: 'HomeView',
  components: {
    MusicIntroduction,
    MusicContent
  }
}
</script>

<template>
  <section class="container mx-auto">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Songs</span>
        <!-- Icon -->
        <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
      </div>
      <!-- Playlist -->
      <ol id="playlist">
        <song-item v-for="song in songList" :key="song.songID" :song="song"></song-item>
      </ol>
      <!-- .. end Playlist -->
    </div>
  </section>
</template>

<script>
import SongItem from './SongItem.vue'
import { songCollection } from '@/includes/firebase'
export default {
  name: 'MusicContent',
  components: {
    SongItem
  },
  data() {
    return {
      songList: [],
      maxPerPage: 3,
      pendingRequests: false
    }
  },
  created() {
    this.getSongs()

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight
      if (bottomOfWindow) {
        this.getSongs()
      }
    },
    async getSongs() {
      if (this.pendingRequests) {
        return
      }
      this.pendingRequests = true

      let snapshots
      if (this.songList.length) {
        const lastEle = await songCollection
          .doc(this.songList[this.songList.length - 1].songID)
          .get()
        snapshots = await songCollection
          .orderBy('modifiedName')
          .startAfter(lastEle)
          .limit(this.maxPerPage)
          .get()
      } else {
        snapshots = await songCollection.orderBy('modifiedName').limit(this.maxPerPage).get()
      }

      snapshots.forEach((document) => {
        const song = {
          songID: document.id,
          ...document.data()
        }
        this.songList.push(song)
      })

      this.pendingRequests = false
    }
  }
}
</script>

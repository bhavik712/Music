<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <upload-box @addSong="addSong"></upload-box>
        </div>
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <uploaded-songs
                v-for="song in songList"
                :key="song.songId"
                :song="song"
                @updateSongDetails="updateSongDetails"
                @deleteSongFromList="deleteSongDetails"
                @updateFlag="updateFlag"
              ></uploaded-songs>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import UploadBox from '../components/upload-music/UploadBox.vue'
import useUserStore from '@/stores/users.js'
import { songCollection, auth } from '@/includes/firebase'
import UploadedSongs from '../components/UploadedSongs.vue'

export default {
  name: 'ManageView',
  components: {
    UploadBox,
    UploadedSongs
  },
  data() {
    return {
      songList: [],
      unsavedChanges: false
    }
  },
  async created() {
    const snapshot = await songCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach(this.addSong)
  },
  beforeRouteEnter(to, from, next) {
    const isUserLoggedIn = useUserStore().userLoggedIn
    if (isUserLoggedIn) {
      next()
    } else {
      next({ name: 'authentication' })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedChanges) {
      next()
    } else {
      const leave = confirm('Are you Sure you want to leave')
      next(leave)
    }
  },
  methods: {
    updateSongDetails(id, values) {
      const updateSong = this.songList.find((song) => song.songId === id)

      updateSong.modifiedName = values.songName
      updateSong.genre = values.songGenre
      this.unsavedChanges = false
    },
    deleteSongDetails(id) {
      const index = this.songList.findIndex((song) => song.songId === id)
      console.log(index)
      this.songList.splice(index, 1)
    },
    addSong(document) {
      const song = {
        ...document.data(),
        songId: document.id
      }
      this.songList.push(song)
    },
    updateFlag(flag) {
      this.unsavedChanges = flag
    }
  }
}
</script>

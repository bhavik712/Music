<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': isDragging }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="isDragging = false"
        @dragover.prevent.stop="isDragging = true"
        @dragenter.prevent.stop="isDragging = true"
        @dragleave.prevent.stop="isDragging = false"
        @drop.prevent.stop="uploadMusicfile($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="uploadMusicfile($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="uploadSong in uploadSongs" :key="uploadSong.name">
        <!-- File Name -->

        <div class="font-bold text-sm" :class="uploadSong.textColor">
          <i :class="uploadSong.icon" class="mr-2"></i>{{ uploadSong.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="uploadSong.progressBarColor"
            :style="{ width: `${uploadSong.currentProgress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, songCollection } from '@/includes/firebase.js'

export default {
  name: 'UploadBox',
  data() {
    return {
      isDragging: false,
      uploadSongs: []
    }
  },
  emits: ['addSong'],
  methods: {
    uploadMusicfile($event) {
      this.isDragging = false
      const uploadedFiles = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files]
      for (const file of uploadedFiles) {
        if (file.type !== 'audio/mpeg') {
          console.log('file format not supported')
          return
        }
        const storageRef = storage.ref()
        const songRef = storageRef.child(`songs/${file.name}`)
        const task = songRef.put(file)

        const uploadSongsLength = this.uploadSongs.push({
          task,
          currentProgress: 0,
          name: file.name,
          progressBarColor: 'bg-blue-400',
          icon: 'fas fa-spinner fa-spin',
          textColor: ''
        })
        const uploadingSongIndex = uploadSongsLength - 1
        task.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.uploadSongs[uploadingSongIndex].currentProgress = progress
          },
          (error) => {
            this.uploadSongs[uploadingSongIndex].progressBarColor = 'bg-red-400'
            this.uploadSongs[uploadingSongIndex].icon = ' fas fa-times'
            this.uploadSongs[uploadingSongIndex].textColor = 'text-red-400'
            console.log(error)
          },
          async () => {
            const song = {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
              originalName: task.snapshot.ref.name,
              modifiedName: task.snapshot.ref.name,
              genre: '',
              totalComments: 0
            }
            song.url = await task.snapshot.ref.getDownloadURL()
            const songRef = await songCollection.add(song)
            const songSnapshot = await songRef.get()
            this.$emit('addSong', songSnapshot)
            this.uploadSongs[uploadingSongIndex].progressBarColor = 'bg-green-400'
            this.uploadSongs[uploadingSongIndex].icon = ' fas fa-check'
            this.uploadSongs[uploadingSongIndex].textColor = 'text-green-400'
          }
        )
      }
    },
    beforeUnmount() {
      for (const file of this.uploadSongs) {
        file.task.cancel()
      }
    }
  }
}
</script>

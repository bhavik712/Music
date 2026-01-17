<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times" @click="deleteSong"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click="this.editSongDetails = true"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="editSongDetails">
      <div
        class="text-white text-center font-bold p-4 rounded mb-4"
        v-if="updationShowStatus"
        :class="updationShowStatusClass"
      >
        {{ updationStatus }}
      </div>
      <vee-form :initial-values="songDetails" @submit="editedSongDetails">
        <div class="mb-3">
          <form-input :fieldProperties="songNameField"></form-input>
        </div>
        <div class="mb-3">
          <form-input :fieldProperties="songGenreField"></form-input>
        </div>
        <form-button :fieldProperties="backButton" @click="discardChanges"></form-button>
        <form-button :fieldProperties="submitButton"></form-button>
      </vee-form>
    </div>
  </div>
</template>
<script>
import FormInput from '@/components/FormComponents/FormInput.vue'
import FormButton from './FormComponents/FormButton.vue'
import { songCollection, storage } from '@/includes/firebase'
export default {
  name: 'UploadedSongs',
  components: {
    FormInput,
    FormButton
  },
  data() {
    return {
      editSongDetails: false,
      changesInSubmission: false,
      updationShowStatus: false,
      updationShowStatusClass: 'bg-blue-600',
      updationStatus: 'wait we are updating',
      songDetails: {
        songName: this.song.modifiedName,
        songGenre: this.song.genre
      },
      songNameField: {
        label: 'Song Title',
        name: 'songName',
        type: 'text',
        placeholder: 'Enter Song Title',
        rules: 'requiredField|minFieldLength: 3|maxFieldLength: 50'
      },
      songGenreField: {
        label: 'Genre',
        name: 'songGenre',
        type: 'text',
        placeholder: 'Enter Genre',
        rules: 'requiredField|minFieldLength: 3|maxFieldLength: 20|alphaSpaces'
      },
      submitButton: {
        type: 'submit',
        class: 'py-1.5 px-3 m-1 rounded text-white bg-green-600',
        text: 'Submit',
        isDisabled: this.changesInSubmission
      },
      backButton: {
        type: 'button',
        class: 'py-1.5 px-3 m-1 rounded text-white bg-red-600',
        text: 'Go back',
        isDisabled: this.changesInSubmission
      }
    }
  },
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  emits: ['updateSongDetails', 'deleteSongFromList', 'updateFlag'],
  methods: {
    async editedSongDetails(values) {
      this.changesInSubmission = true
      this.updationShowStatus = true

      try {
        await songCollection.doc(this.song.songId).update({
          modifiedName: values.songName,
          genre: values.songGenre
        })
      } catch (error) {
        this.changesInSubmission = false
        this.updationShowStatusClass = 'bg-red-600'
        this.updationStatus = 'Some unexpected Error occured! please Try again later'
        console.log(error)
        return
      }
      this.updationShowStatusClass = 'bg-green-600'
      this.updationStatus = 'Song details Updated Sucessfully'
      this.$emit('updateSongDetails', this.song.songId, values)

      window.addEventListener('click', () => {
        this.updationShowStatus = false
        this.editSongDetails = false
      })
      //   setTimeout(() => {
      //     this.updationShowStatus = false
      //     this.editSongDetails = false
      //   }, 1200)
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.originalName}`)
      await songRef.delete()
      await songCollection.doc(this.song.songId).delete()
      this.$emit('deleteSongFromList', this.song.songId)
    },
    discardChanges() {
      this.editSongDetails = false
      this.$emit('updateFlag', false)
    }
  }
}
</script>

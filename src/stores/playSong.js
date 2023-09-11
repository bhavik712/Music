import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '@/includes/helper'
import { userCollection } from '@/includes/firebase.js'
export default defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '--:--',
    duration: '--:--',
    playerProgress: '0%',
    artistName: ''
  }),

  actions: {
    async playSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }
      this.currentSong = song
      this.getArtistName()
      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },

    async toggleAudio() {
      if (!this.sound.playing) {
        return
      }

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },

    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())
      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return
      }

      const { x, width } = event.currentTarget.getBoundingClientRect()
      const clickX = event.clientX - x
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage
      this.sound.seek(seconds)

      this.sound.once('seek', () => {
        setTimeout(() => {
          this.progress()
        }, 1000)
      })
    },
    async getArtistName() {
      const artist = await userCollection.doc(this.currentSong.uid).get()
      const artistDetails = artist.data()
      this.artistName = artistDetails.name
    }
  },

  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  }
})

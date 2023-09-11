<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
        style="background-image: url(/assets/img/song-header.png)"
      ></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="playSong(song)"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modifiedName }}</div>
          <div>{{ song.genre }}</div>
        </div>
      </div>
    </section>
    <!-- Form -->
    <section class="container mx-auto mt-6">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{ song.totalComments }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 rounded mb-4"
            v-if="showCommentSubmissionStatus"
            :class="commentStatusClass"
          >
            {{ commentStatus }}
          </div>
          <vee-form @submit="addComment" v-show="userLoggedIn">
            <form-input :fieldProperties="commentsField"></form-input>
            <form-button :fieldProperties="submitButton"></form-button>
            <!-- <button type="submit" class="py-1.5 px-3 rounded text-white bg-green-600 block">
            Submit
          </button> -->
          </vee-form>
          <!-- Sort Comments -->
          <select
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            v-model="sortChoice"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto" id="comments">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.commentID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.autherName }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>
<script>
import { songCollection, auth, commentsCollection } from '@/includes/firebase'
import useUserStore from '@/stores/users.js'
import usePlayerStore from '@/stores/playSong.js'
import { mapWritableState, mapActions } from 'pinia'
import FormInput from '../components/FormComponents/FormInput.vue'
import FormButton from '../components/FormComponents/FormButton.vue'
export default {
  name: 'SongPage',
  data() {
    return {
      song: {},
      comments: [],
      sortChoice: '1',
      isCommentSubmitted: false,
      showCommentSubmissionStatus: false,
      commentStatusClass: 'bg-blue-600',
      commentStatus: 'Your Comment is being added',
      commentsField: {
        label: 'Comment',
        name: 'comment',
        type: 'text',
        placeholder: 'Your comment here...',
        rules: 'requiredField|minFieldLength: 3'
      },
      submitButton: {
        type: 'submit',
        class: 'py-1.5 px-3 mt-3 rounded text-white bg-green-600 block',
        text: 'Submit',
        isDisabled: this.isCommentSubmitted
      }
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn', 'currentLoggedUser']),
    sortedComments() {
      return this.comments.slice().sort((a, b) => {
        if (this.sortChoice === '1') {
          return new Date(b.datePosted) - new Date(a.datePosted)
        }
        return new Date(a.datePosted) - new Date(b.datePosted)
      })
    }
  },
  async created() {
    const snapshot = await songCollection.doc(this.$route.params.id).get()

    if (!snapshot.exists) {
      this.$router.push({ name: 'home' })
      return
    }

    const { sortChoice } = this.$route.query
    this.sortChoice = sortChoice === '1' || sortChoice === '2' ? sortChoice : '1'

    this.song = snapshot.data()

    this.getComments()
  },
  components: {
    FormInput,
    FormButton
  },
  methods: {
    ...mapActions(usePlayerStore, ['playSong']),
    async addComment(values, { resetForm }) {
      this.isCommentSubmitted = true
      this.showCommentSubmissionStatus = true

      const comment = {
        songID: this.$route.params.id,
        content: values.comment,
        datePosted: new Date().toString(),
        userID: auth.currentUser.uid,
        autherName: this.currentLoggedUser.name
      }

      try {
        await commentsCollection.add(comment)
        this.song.totalComments = this.comments.length
        this.song.totalComments += 1
        await songCollection.doc(this.$route.params.id).update({
          totalComments: this.song.totalComments
        })
        this.getComments()
      } catch (error) {
        console.log(error)
        this.isCommentSubmitted = false
        this.commentStatusClass = 'bg-red-500'
        this.commentStatus = 'some unexpected error occur. Try again later'
        return
      }

      this.commentStatusClass = 'bg-green-600'
      this.rcommentStatus = 'Your Comments get added Sucessfully'

      setTimeout(() => {
        resetForm()
        this.showCommentSubmissionStatus = false
      }, 1000)
    },
    async getComments() {
      this.comments = []
      const snapshot = await commentsCollection.where('songID', '==', this.$route.params.id).get()

      snapshot.forEach((document) => {
        this.comments.push({
          commentID: document.id,
          ...document.data()
        })
      })
    }
  },
  watch: {
    sortChoice(newVal) {
      if (newVal === this.$route.query.sortChoice) {
        return
      }
      this.$router.push({
        query: {
          sortChoice: newVal
        }
      })
    }
  }
}
</script>

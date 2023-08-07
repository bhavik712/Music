import { defineStore } from 'pinia'

export default defineStore('model', {
  state: () => ({
    isHidden: true,
    getters: {
      hiddenClass(state) {
        return !state.isOpen ? 'hidden' : ''
      }
    }
  })
})

<template>
  <button
    type="submit"
    class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    :disabled="isDisabled"
  >
    Submit
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: ['isDisabled']
}
</script>

<template>
  <button :type="fieldType" :class="fieldClass" :disabled="fieldDisabled">
    {{ fieldText }}
  </button>
</template>

<script>
export default {
  name: 'FormButton',
  props: ['fieldProperties'],
  computed: {
    fieldType() {
      return this.fieldProperties.type
    },
    fieldClass() {
      return this.fieldProperties.class
    },
    fieldDisabled() {
      return this.fieldProperties.isDisabled
    },
    fieldText() {
      return this.fieldProperties.text
    }
  }
}
</script>

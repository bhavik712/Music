<template>
  <div class="mb-1 pl-6">
    <vee-field
      :name="fieldName"
      type="checkbox"
      class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      value="1"
      :rules="fieldRules"
    />
    <label class="inline-block">{{ fieldLabel }}</label>
  </div>
  <error-message class="text-red-600" :name="fieldName" />
</template>

<script>
export default {
  name: 'FormCheckbox',
  props: ['fieldProperties'],
  computed: {
    fieldLabel() {
      return this.fieldProperties.label
    },
    fieldName() {
      return this.fieldProperties.name
    },
    fieldRules() {
      return this.fieldProperties.rules
    }
  }
}
</script>

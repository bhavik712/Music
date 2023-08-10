<template>
  <label class="inline-block mb-2">{{ fieldLabel }}</label>
  <vee-field
    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
    :name="fieldName"
    :type="fieldtype"
    :placeholder="fieldPlaceholder"
    :rules="fieldRules"
  />
  <error-message class="text-red-600" :name="fieldName" />
</template>

<script>
export default {
  name: 'FormInput',
  props: ['fieldProperties'],
  computed: {
    fieldLabel() {
      return this.fieldProperties.label
    },
    fieldName() {
      return this.fieldProperties.name
    },
    fieldtype() {
      return this.fieldProperties.type
    },
    fieldPlaceholder() {
      return this.fieldProperties.placeholder
    },
    fieldRules() {
      return this.fieldProperties.rules
    }
  }
}
</script>

<template>
  <label class="inline-block mb-2">{{ fieldLabel }}</label>
  <vee-field
    as="select"
    :name="fieldName"
    :rules="fieldRules"
    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
  >
    <template v-for="choice in fieldValues" :key="choice">
      <option :value="choice">{{ choice }}</option>
    </template>
  </vee-field>
  <error-message class="text-red-600" name="userCountry" />
</template>

<script>
export default {
  name: 'FormSelect',
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
    },
    fieldValues() {
      return this.fieldProperties.values
    }
  }
}
</script>

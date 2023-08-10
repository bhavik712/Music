<template>
  <div class="mb-3">
    <label class="inline-block mb-2">Password</label>
    <vee-field
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      name="password"
      type="Password"
      placeholder="Enter Password"
      rules="requiredField|minFieldLength:8|maxFieldLength:12|alphaNum"
    />
    <error-message class="text-red-600" name="password" />
  </div>
  <div class="mb-3">
    <label class="inline-block mb-2">Confirm Password</label>
    <vee-field
      class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      name="confirmPassword"
      type="Password"
      placeholder="Confirm Password"
      rules="requiredField|confirmPassword:@password"
    />
    <error-message class="text-red-600" name="confirmPassword" />
  </div>
</template>

<script>
export default {
  name: 'FormInputPassword'
}
</script>

<template>
  <label
      for="floating_standard"
      class="label"
  >
    {{ label }}
  </label>
</template>
<script setup>
defineProps({
  label: {
    type: String,
    default: 'Floating standard'
  }
})
</script>
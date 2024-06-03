<template>
  <div class="floating-field" :class="value?.length === 0 ? 'empty':'has-content'">
    <input
      type="text"
      class="input"
      placeholder=" "
      v-model="value"
    />
    <Label :label="label" />
  </div>
</template>
<script setup>
import {useVModel} from "@vueuse/core";
import Label from "./Label.vue";

const props = defineProps({
  label: {
    type: String,
    default: 'Floating standard'
  },
  modelValue: {
    type: String,
    default: ''
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  }
});
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
</script>
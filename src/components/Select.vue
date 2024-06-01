<template>
  <div class="floating-field" :class="emptyValue === value ? 'empty' : 'selected'">
    <select
      ref="selectItem"
      class="input"
      v-model="value"
      placeholder=" "
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    <svg class="select" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
    <!-- reset svg -->
    <svg
        v-if="value !== emptyValue"
        @click="value = emptyValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="clear"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
    <Label :label="label" />
  </div>
</template>
<script setup>
import {ref} from "vue";
import {useActiveElement, useVModel} from "@vueuse/core";
import Label from "./Label.vue";
const selectItem = ref(null);
const activeElement = useActiveElement()


const props = defineProps({
  label: {
    type: String,
    default: 'Floating standard'
  },
  emptyValue : {
    type: String,
    default: null
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
<template>
  <div class="floating-default" :class="value?.length === 0 ? 'empty':'has-content'">
    <textarea
      class="input"
      placeholder=" "
      v-model="value"
    />
    <Label :label="label" />
  </div>
</template>
<script setup>
import Label from "./Label.vue";
import {useVModel} from "@vueuse/core";

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
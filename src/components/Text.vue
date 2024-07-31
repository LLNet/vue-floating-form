<template>
  <div
      :class="[
        (value?.length === 0 ? 'empty':'has-content'),
        (layout === 'floating-field' ? 'floating-field':'floating-default'),
        (info ? 'has-info':undefined)
      ]"
      ref="wrapperEl"
  >
    <input
      ref="inputEl"
      type="text"
      class="input"
      placeholder=" "
      v-model="value"
    />
    <Label :label="label" />
    <InfoIcon
      v-if="info"
      :info="info"
      :input-el="inputEl"
      :wrapper-el="wrapperEl"
      :value="value"
      :message="infoMessage"
    />
  </div>
</template>
<script setup>
import {useVModel} from "@vueuse/core";
import Label from "./Label.vue";
import {ref} from "vue";
import InfoIcon from "./InfoIcon.vue";

const wrapperEl = ref(null);
const inputEl   = ref(null);
const infoEl    = ref(null);

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
  },
  layout: {
    type: String,
    default: 'floating-field',
    validator: (value) => ['floating-field', 'floating-default'].includes(value)
  },
  info: {
    type: Function,
    default: () => null
  },
  infoMessage: {
    type: String,
    default: ''
  },
});
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
</script>
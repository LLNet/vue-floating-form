<template>
  <div
      ref="wrapperEl"
      :class="[
        (value?.length === 0 ? 'empty':'has-content'),
        (layout === 'floating-field' ? 'floating-field':'floating-default'),
        (info ? 'has-info':undefined)
      ]"
  >
    <textarea
      class="input"
      placeholder=" "
      v-model="value"
      ref="inputEl"
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
    <slot />
  </div>
</template>
<script setup>
import Label from "./Label.vue";
import {useVModel} from "@vueuse/core";
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
  info: {
    type: Function,
    default: null
  },
  infoMessage: {
    type: String,
    default: ''
  },
  layout: {
    type: String,
    default: 'floating-field',
    validator: (value) => ['floating-field', 'floating-default'].includes(value)
  },
});

const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
</script>
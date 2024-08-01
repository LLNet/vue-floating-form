<template>
  <div
      :class="[
        (value === yesValue ? 'checked' : 'unchecked'),
        (info ? 'has-info':undefined),
        (rounded ? 'round':undefined),
      ]"
      ref="wrapperEl"
      class="floating-toggle flex flex-row items-center"
  >
    <div @click="toggle">
      <input ref="inputEl" id="switch-3" type="checkbox" v-model="value" :value="yesValue" class="sr-only" />
      <div class=""></div>
    </div>
    <label class="ml-2">{{ label }}</label>
    <InfoIcon v-if="info" :value="value" :info="info" :input-el="inputEl" :wrapper-el="wrapperEl" :message="infoMessage" />
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
  yesValue: {
    type: [String, Number, Boolean],
    default: true
  },
  noValue: {
    type: [String, Number, Boolean],
    default: false
  },
  rounded: {
    type: Boolean,
    default: true
  },
  info: {
    type: Function,
    default: null
  },
  infoMessage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit);

function toggle() {
  value.value = value.value === props.yesValue ? props.noValue : props.yesValue;
}
</script>
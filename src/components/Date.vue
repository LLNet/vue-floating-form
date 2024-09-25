<template>
  <div
      :class="[
        (value?.length === 0 ? '':'has-content'),
        (layout === 'floating-field' ? 'floating-field':'floating-default')
      ]"
      ref="wrapperEl"
  >
    <input
        ref="inputEl"
        :type="type"
        class="input"
        v-model="value"
        v-bind="allowInputEvents($attrs, 'date')"
    />
    <Label :label="label" />
  </div>
</template>
<script setup>
import {useVModel} from "@vueuse/core";
import Label from "./Label.vue";
import {computed, ref} from "vue";
import InfoIcon from "./InfoIcon.vue";
import {allowInputEvents} from "@/global.js";

defineOptions({
  inheritAttrs: false
})

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
  layout: {
    type: String,
    default: 'floating-field',
    validator: (value) => ['floating-field', 'floating-default'].includes(value)
  },
  type:{
    type: String,
    default: 'datetime-local',
    validator: (value) => ['datetime-local', 'date', 'time'].includes(value)
  }
});
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit);
</script>
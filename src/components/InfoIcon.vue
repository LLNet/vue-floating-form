<template>
  <svg
      class="info"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref="infoEl"
      @click="show = !show"
      @mouseenter="show = true"
      @mouseleave="show = false"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
</template>
<script setup>
import {ref, watch} from "vue";

const infoEl = ref(null);
const show = ref(false);

const props = defineProps({
  info: {
    type: Function,
    default: null
  },
  message: {
    type: String,
    default: ''
  },
  wrapperEl: {
    type: Object,
    default: null
  },
  inputEl: {
    type: Object,
    default: null
  },
  value: {
    type: [String, Number, Array, Object, Boolean],
    default: null
  }
});

watch(() => show.value, (status) => {
  props.info({status, target: infoEl.value, wrapperElement: props.wrapperEl, inputElement: props.inputEl, value:props.value, message:props.message})
});
</script>

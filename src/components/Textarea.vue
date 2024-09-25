<template>
  <div
      ref="wrapperEl"
      :class="[
        (value?.length === 0 ? 'empty':'has-content'),
        (layout === 'floating-field' ? 'floating-field':'floating-default'),
        (info ? 'has-info':undefined),
        (disabled ? 'is-disabled':undefined),
        (resize ? 'has-resize':undefined),
      ]"
      v-bind="allowWrapperAttrs($attrs)"
  >
    <textarea
      class="input"
      :placeholder="placeholder"
      v-model="value"
      ref="textarea"
      :rows="rows"
      :maxlength="maxLength"
      :disabled="disabled"
      @keypress="maxRowsKeyPress"
      @paste="afterPaste"
      v-bind="allowInputEvents($attrs, 'textarea')"
    />
    <Label :label="label" />
    <InfoIcon
        v-if="info"
        :info="info"
        :input-el="textarea"
        :wrapper-el="wrapperEl"
        :value="value"
        :message="infoMessage"
    />
    <slot />
  </div>
</template>
<script setup>
import Label from "./Label.vue";
import {useTextareaAutosize, useVModel} from "@vueuse/core";
import {ref, watch} from "vue";
import InfoIcon from "./InfoIcon.vue";
import {allowInputEvents, allowWrapperAttrs} from "@/global.js";

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
  rows: {
    type: Number,
    default: 3
  },
  maxRows: {
    type: Number,
    default: null
  },
  disablePaste: {
    type: Boolean,
    default: false
  },
  maxLength: {
    type: Number,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  autoSize: {
    type: Boolean,
    default: false
  },
  resize:{
    type:Boolean,
    default: false
  },
  placeholder:{
    type:String,
    default: undefined,
  }
});

const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)
const textarea = ref(null);

if(props.autoSize){
  useTextareaAutosize({ styleProp: 'minHeight', watch: value,props, element: textarea });
}

function maxRowsKeyPress(event) {
  if(props.maxRows === null){
    return;
  }

  const el = event.target;
  const numberOfLines = (el.value.match(/\n/g) || []).length + 1;
  const maxRows = 5;

  if (event.which === 13 && numberOfLines >= maxRows ) {
    event.preventDefault();
  }
}

function afterPaste(event) {
  if(props.disablePaste || props.maxRows !== null){
    event.preventDefault();
  }
}
</script>
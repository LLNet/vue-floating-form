<template>
  <div
      class="color"
      :class="[
        (value?.length === 0 ? 'empty':'has-content'),
        (layout === 'floating-field' ? 'floating-field':'floating-default'),
        (info ? 'has-info':undefined)
      ]"
      ref="wrapperEl"
  >
    <button class="input" @click="pickColor">
      &nbsp;{{ value }}&nbsp;
    </button>
    <input
        v-if="colorPicker === null"
        type="color"
        v-model="value"
        ref="inputEl"
        @change="emit('update:value', value)"
    />
    <Label :label="label" />
    <div class="show-color" :style="'--show-color:' + value + ';'">&nbsp;</div>
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
    default: null
  },
  infoMessage: {
    type: String,
    default: ''
  },
  colorPicker:{
    type: Function,
    default: null
  }
});
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit)

function pickColor(){
  if(props.colorPicker){
    return props.colorPicker({
      setValue: function(value){
        emit('update:modelValue', value)
      },
      getValue: function(){
        return value.value;
      }
    })
  }

  inputEl.value.click();
}
</script>
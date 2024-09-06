<template>
  <div
      ref="wrapperEl"
      :class="[
          (value?.toString().length ?? 0) === 0 ? 'empty':'has-content',
          layout === 'floating-field' ? 'floating-field':'floating-default',
          info ? 'has-info':undefined
      ]"
  >
    <input
      ref="inputEl"
      type="text"
      class="input"
      :placeholder="placeholder"
      v-model="value"
      v-bind="modelModifiers"
      @input="($event) => onlyNumbers($event)"
      inputmode="numeric"
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
import {computed, ref} from "vue";
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
    type: [String, Number],
    default: null
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  format: {
    type: String,
    default: 'int',
    validator: (value) => ['int', 'float'].includes(value)
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
  placeholder:{
    type:String,
    default: undefined,
  }
});
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => (typeof props.modelValue === "number" || props.modelValue !== null ? Number(props.modelValue) : null),
  set: (value) => {
    if (props.format === 'int') {
      value = parseInt(value);
    } else if (props.format === 'float') {
      value = parseFloat(value);
    }

    if(isNaN(value)) {
      value = null;
    }

    emit('update:modelValue', value);
  }
});

const onlyNumbers = (e) => {
  if (props.modelModifiers && props.modelModifiers?.float) {
    e.target.value = e.target.value.replace(/[^0-9\.\,]/g, '')
  } else {
    e.target.value = e.target.value.replace(/[^0-9]/g, '')
  }

  value.value = e.target.value;
}

</script>
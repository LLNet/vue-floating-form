<template>
  <div class="floating-default" :class="value?.length === 0 ? 'empty':'has-content'">
    <input
      type="text"
      class="input"
      placeholder=" "
      v-model="value"
      v-bind="modelModifiers"
      @input="($event) => onlyNumbers($event)"
      inputmode="numeric"
    />
    <Label :label="label" />
  </div>
</template>
<script setup>
import {useVModel} from "@vueuse/core";
import Label from "./Label.vue";
import {computed} from "vue";

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
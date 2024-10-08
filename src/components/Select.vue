<template>
  <div
      :class="[
          emptyValue === value ? 'empty' : 'selected',
          layout === 'floating-field' ? 'floating-field':'floating-default',
          info ? 'has-info' : undefined
      ]"
      ref="wrapperEl"
      v-bind="allowWrapperAttrs($attrs)"
  >
    <select
      ref="selectItem"
      class="input"
      v-model="value"
      placeholder=" "
    >
      <DefineTemplate v-slot="{options}">
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.label }}
        </option>
      </DefineTemplate>
      <optgroup v-if="noneGroupedLabel !== null" :label="noneGroupedLabel">
        <ReuseTemplate :options="options.options.filter((option) => option.group === null)" />
      </optgroup>
      <ReuseTemplate e-else :options="options.options.filter((option) => option.group === null)" />
      <optgroup v-for="group in options.groups" :label="group">
        <ReuseTemplate :options="options.options.filter((option) => option.group === group)" />
      </optgroup>
    </select>
    <InfoIcon
        v-if="info"
        :info="info"
        :message="infoMessage"
        :value="value"
        :input-el="selectItem"
        :wrapper-el="wrapperEl"
    />
    <svg class="select" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
    <!-- reset svg -->
    <svg
        v-if="enableEmptyValue && (value !== emptyValue)"
        @click="value = emptyValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="clear"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
    <Label :label="label" />
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import {useActiveElement, useVModel, useTemplateRefsList, createReusableTemplate} from "@vueuse/core";
import Label from "./Label.vue";
import InfoIcon from "./InfoIcon.vue";
import {allowWrapperAttrs} from "@/global.js";
const selectItem = ref(null);
const activeElement = useActiveElement();

const wrapperEl = ref(null);
const inputEl   = ref(null);
const infoEl    = ref(null);

const props = defineProps({
  label: {
    type: String,
    default: 'Floating standard'
  },
  emptyValue : {
    type: String,
    default: null
  },
  enableEmptyValue: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  modelModifiers: {
    type: Object,
    default: () => ({})
  },
  options: {
    type: [Array, Object],
    default: () => []
  },
  noneGroupedLabel: {
    type: String,
    default: null
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
  }
});

const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit);
const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

const options = computed(() => {
  let tmp = [];
  let groups = [];
  let isArray = Array.isArray(props.options);
  let isObject = typeof props.options === 'object';

  if(!isObject){
    return {options: [], groups: []};
  }

  const options = isArray ? props.options : Object.entries(props.options);

  options.forEach((arg, index) => {
    const {key, value} = (isArray ?
            {key: index, value: arg} :
            {key: arg[0], value: arg[1]}
    );

    if (typeof value !== 'object'){
      tmp.push(isArray ?
          {label: value, value: value, group: null} :
          {label: value, value: key, group: null}
      );
    } else if (typeof value === 'object'){
      tmp.push({
        value: (value.hasOwnProperty('value') ? value.value : key),
        label: (value?.hasOwnProperty('label') ? value.label : key),
        group: (value?.group ?? null)
      });

      if(value?.group && !groups.includes(value.group)){
        groups.push(value.group);
      }
    }
  });

  return {
    options: tmp,
    groups: groups
  };
});
</script>
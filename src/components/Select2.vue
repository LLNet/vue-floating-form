<template>
  <div
    ref="selectElement"
    class="select2"
    :class="{
      focus: focusin,
      empty: (value === emptyValue),
      selected: (value !== emptyValue),
      'has-info': info,
      'floating-field': (layout === 'floating-field'),
      'floating-default': (layout === 'floating-default')
    }"
    @click.passive="staticValue = !staticValue"
    @focusin.passive="focusin = true"
    @focusout.passive="focusin = false"
  >
    <Listbox
      class="input"
      v-model="value"
      :multiple="multiple"
    >
      <div class="relative">
        <ListboxButton>
          <span>{{ activeOptions }}&nbsp;</span>
        </ListboxButton>
        <transition
            leave-active-class="transition_active"
            leave-from-class="transition_from"
            leave-to-class="transition_to"
        >
          <ListboxOptions
              :static="staticValue"
              :unmount="false"
          >
            <ListboxOption
                v-slot="{ active, selected }"
                v-for="option in options"
                :key="option.label"
                :value="option.value"
                as="template"
            >
              <li
                  :class="active ? 'active' : undefined"
              >
                <slot name="option" :option="option" :active="active" :selected="selected">
                  <span class="label" :class="[selected ? 'selected' : undefined]">
                    {{ option.label }}
                  </span>
                  <span v-if="option.desc" v-html="option.desc"></span>
                </slot>
                <span
                    v-if="selected"
                    class="icon"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                    </svg>
                  </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <Label :label="label" class="z-20 block" />
    <InfoIcon v-if="info" :info="info" :message="infoMessage" :wrapperEl="selectElement" :value="value" />
    <svg class="select" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
    <!-- reset svg -->
    <svg
        v-if="enableEmptyValue && value !== emptyValue"
        @click="value = emptyValue"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="clear"
    >
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import Label from "@/components/Label.vue";
import {useVModel} from "@vueuse/core";
import InfoIcon from "./InfoIcon.vue";

const wrapperEl = ref(null);
const inputEl   = ref(null);
const infoEl    = ref(null);

const props = defineProps({
  label: {
    type: String,
    default: 'Floating standard'
  },
  emptyValue : {
    type: [String, Number],
    default: null
  },
  enableEmptyValue: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    default: null
  },
  options: {
    type: [Array, Object],
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
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

const focusin = ref(false);
const emit = defineEmits(['update:modelValue']);
const selectElement  = ref(null);
const staticValue    = ref(false);
const value = useVModel(props, 'modelValue', emit);
const emptyValue = ref(props.multiple ? [] : props.emptyValue);

const options = computed(() => {
  let tmp = [];
  let isArray = Array.isArray(props.options);
  let isObject = typeof props.options === 'object';

  if(!isObject){
    return [];
  }

  const options = isArray ? props.options : Object.entries(props.options);

  options.forEach((arg, index) => {
    const {key, value} = (isArray ?
            {key: index, value: arg} :
            {key: arg[0], value: arg[1]}
    );

    if (typeof value !== 'object'){
      tmp.push(isArray ?
          {label: value, value: value} :
          {label: value, value: key}
      );
    } else if (typeof value === 'object'){
      tmp.push({value: (value?.value ?? key), label: (value?.label ?? key), desc: value?.desc ?? undefined});
    }
  });

  return tmp;
});

const activeOptions = computed(() => {
  if(props.multiple){
    return value.value.map(val => {
      const items = options.value.filter(option => option.value === val);
      return items.length ? items[0].label : '';
    }).join(', ');
  }


  const items = options.value.filter(option => option.value === value.value)?.[0];

  return items ? items.label : '';
});






function triggerFocus(event) {
  if (selectElement.value && !selectElement.value.contains(event.target)) {
    staticValue.value = false;
  }
}

onMounted(() => {
  document.body.addEventListener('click', triggerFocus);
  document.body.addEventListener('focus', triggerFocus);
  document.body.addEventListener('mousedown', triggerFocus);
});
onUnmounted(() => {
  document.body.removeEventListener('click', triggerFocus);
  document.body.removeEventListener('focus', triggerFocus);
  document.body.removeEventListener('mousedown', triggerFocus);
});
</script>

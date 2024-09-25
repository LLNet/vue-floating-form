<template>
  <div
      :class="[
        (value?.length === 0 ? 'empty':'has-content'),
        (layout === 'floating-field' ? 'floating-field':'floating-default'),
        (info ? 'has-info':undefined)
      ]"
      ref="wrapperEl"
      v-bind="allowWrapperAttrs($attrs)"
  >
    <input
      ref="inputEl"
      type="text"
      class="input"
      :placeholder="placeholder"
      :list="dataListId"
      v-model="value"
      @focusin="showDataList = true"
      @focusout="showDataList = false"
      v-bind="allowInputEvents($attrs, 'text')"
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
    <datalist v-if="showDataList && dataList.length > 0" :id="dataListId">
      <option v-for="value in dataList" :value="value" />
    </datalist>
  </div>
</template>
<script setup>
import {useVModel} from "@vueuse/core";
import Label from "./Label.vue";
import {computed, ref} from "vue";
import InfoIcon from "./InfoIcon.vue";
import {allowInputEvents, allowWrapperAttrs} from "@/global.js";

defineOptions({
  inheritAttrs: false
})

const wrapperEl = ref(null);
const inputEl   = ref(null);
const infoEl    = ref(null);
const showDataList = ref(false);

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
  placeholder:{
    type:String,
    default: undefined,
  },
  list:{
    type: [String, Array],
    default: undefined
  }
});
const emit = defineEmits(['update:modelValue'])
const value = useVModel(props, 'modelValue', emit);

const dataList = computed(() => {
  return props.list !== undefined && (typeof props.list) === 'object' && Array.isArray(props.list) ? props.list : [];
});

function generateUniqueId(obj) {
  const str = JSON.stringify(obj);
  let hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString();
}

const dataListId = computed(() => {
  if(props.list === undefined){
    return undefined;
  }
  else if(typeof props.list === 'string'){
    return props.list;
  }

  return 'datalist_' + generateUniqueId(props.list);
});
</script>
<template>
  <div :class="layout"
       v-bind="allowWrapperAttrs($attrs)"
  >
    <div class="editor">
      <div ref="editor">
      </div>
    </div>
  </div>
</template>,
<script setup>
import Quill from "quill";
import {onMounted, ref, watch} from "vue";
import "quill/dist/quill.snow.css";
import {allowWrapperAttrs} from "@/global.js";

const editor = ref(null);
const quill = ref(null);

defineOptions({
  inheritAttrs: false
});

let timeout = null;
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: 'Floating standard'
  },
  modelValue: {
    type: String,
    default: ''
  },
  contentType: {
    type: String,
    default: 'html'
  },
  layout: {
    type: String,
    default: 'floating-field',
    validator: (value) => ['floating-field', 'floating-default'].includes(value)
  },
});

function setContent(value) {
  if(props.contentType === 'html') {
    setHtml(value);
  } else {
    setText(value);
  }
}

function setHtml(value) {
  quill.value.root.innerHTML = value;
}

function setText(value) {
  quill.value.root.innerText = value;
}

onMounted(() => {
  quill.value = new Quill(editor.value, {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
      ]
    }
  });
  setContent(props.modelValue);
  quill.value?.on('text-change', () => {
    let currentOps = null;

    switch (props.contentType) {
      case 'text':
        currentOps = quill.value.root.innerText;
        break;
      case 'html':
      default:
        currentOps = quill.value.getSemanticHTML();
        break;
    }

    if(timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      emit('update:modelValue', currentOps)
    }, 500);
  });
});
watch(() => props.modelValue, (newValue) => {
  if(quill.value.root.innerHTML === newValue) return;
  if(quill.value.hasFocus()) return;

  if(timeout) clearTimeout(timeout);

  timeout = setTimeout(() => {
    quill.value.root.innerHTML = newValue;
  }, 500);
}, {deep: true});
</script>
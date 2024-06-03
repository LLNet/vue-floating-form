<script setup>
import Text from '@/components/Text.vue';
import Select from "./components/Select.vue";
import Textarea from "./components/Textarea.vue";
import {ref} from "vue";
import Number from "./components/Number.vue";
import Editor from "./components/Editor.vue";
import Select2 from "@/components/Select2.vue";

const form = ref({
  name: '',
  type: '',
  type2: [],
  message: '',
  number: 0
});
</script>
<template>
  <div class="grid grid-cols-2 gap-4 p-4 container mx-auto">
    <Text v-model="form.name" />
    <Number v-model="form.number" />
    <Select v-model="form.type" :empty-value="null" :options="['1', {label:2, value:2}, {label:2, value:2, group:'test'}, {label:3}, '5']" />
    <Select2 v-model="form.type" :empty-value="null" />
    <Select2 :multiple="true" v-model="form.type2" :empty-value="null" :options="['1', {label:2, value:2}, {label:2, value:2, group:'test'}, {label:3}, '5']" />
    <Textarea v-model.lazy="form.message" />
    <Editor v-model="form.message" />
    <Editor v-model="form.name" content-type="text" />
  </div>
  <pre>
    {{ form }}
  </pre>
  <dialog>
    <pre>{{form}}</pre>
  </dialog>
</template>
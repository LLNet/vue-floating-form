<script setup>
import {Text} from '$/text';
import Select from "./components/Select.vue";
import Textarea from "./components/Textarea.vue";
import {ref} from "vue";
import Number from "./components/Number.vue";
import Editor from "./components/Editor.vue";

const form = ref({
  name: '',
  type: '',
  message: '',
  number: 0
});
</script>
<template>
  <div class="grid grid-cols-1 gap-4 p-4 container mx-auto">
    <Text v-model="form.name" />
    <Number v-model="form.number" />
    <Select v-model="form.type" empty-value="" :options="['1', {label:2, value:2}, {label:2, value:2, group:'test'}, {label:3}, '5']" />
    <Select v-model="form.type" empty-value="" :options="{'1':'1', 2:{value:2, label:'2'}, 3:{value:'_3', label:'__3', group:'__4'}}" />
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
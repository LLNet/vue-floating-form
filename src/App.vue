<script setup>
import Text from './components/Text.vue';
import Select from "./components/Select.vue";
import Textarea from "./components/Textarea.vue";
import {ref} from "vue";
import Number from "./components/Number.vue";

const form = ref({
  name: '',
  type: '',
  message: '',
  number: 0
});
</script>
<template>
  <div class="grid grid-cols-1 gap-4 p-4">
    <Text v-model="form.name" />
    <Number v-model="form.number" />
    <Select v-model="form.type" empty-value="" />
    <Textarea v-model.lazy="form.message" />
  </div>
  <pre>
    {{ form }}
  </pre>
  <dialog>
    <pre>{{form}}</pre>
  </dialog>
</template>
<script setup>
import Text from './components/Text.vue';
import Select from "./components/Select.vue";
import Textarea from "./components/Textarea.vue";
import {ref} from "vue";

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
});
</script>
<template>
  <div class="grid grid-cols-4 gap-4 p-4">
    <Text />
    <Select />
    <Text />
    <Select />
    <Text />
    <Select />
    <Text />
    <Textarea v-model.lazy="form.message" />
    <Textarea v-model.lazy="form.message" />
    <Textarea v-model.lazy="form.message" />
    <Textarea v-model.lazy="form.message" />
  </div>
</template>
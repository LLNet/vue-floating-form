<script setup>
import Text from '@/components/Text.vue';
import Select from "./components/Select.vue";
import Textarea from "./components/Textarea.vue";
import {ref} from "vue";
import Number from "./components/Number.vue";
import Editor from "./components/Editor.vue";
import Select2 from "@/components/Select2.vue";
import {flip, offset, shift, useFloating} from "@floating-ui/vue";

const form = ref({
  name: '',
  type: '',
  type2: [],
  message: '',
  number: 0
});
const layout = ref('floating-field');
const events = ref([]);
const reference = ref(null);
const referenceObject = ref(null);

function info(ob) {
  reference.value = ob.status ? ob.target : null;
  referenceObject.value = ob;
}

const floating = ref(null);

const {floatingStyles} = useFloating(reference, floating, {
  placement: 'top',
  middleware: [offset(10), flip(), shift()],
});
</script>
<template>
  <div class="grid grid-cols-2 gap-4 p-4 container mx-auto">
    <button @click="layout = 'floating-field'">Floating Field</button>
    <button @click="layout = 'floating-default'">Floating Default</button>
    <Text
        info-message="tester" :layout="layout" v-model="form.name" :info="info" />
    <Number
        info-message="tester" :layout="layout" v-model="form.number" />
    <Select
        info-message="tester" :layout="layout" v-model="form.type" :info="info" />
    <Select2
        :info="info"
        info-message="tester"
        :layout="layout"
        v-model="form.type"
        :empty-value="''"
        :options="['1', {label:2, value:2}, {label:2, value:2, group:'test'}, {label:3}, '5']"
    />
    <Select2
        :layout="layout"
        :multiple="true"
        v-model="form.type2"
        :empty-value="null"
        :options="['1', {label:2, value:2}, {label:2, value:2, group:'test'}, {label:3}, '5']"
        :info="info"
        info-message="tester"
    />
    <Textarea v-model.lazy="form.message" :info="info"
              info-message="tester" :layout="layout">
      <div>{{ form.message.length }} / 500</div>
    </Textarea>
    <Editor v-model="form.message" :layout="layout" />
    <Editor v-model="form.name" content-type="text" :layout="layout"/>
    <div v-if="reference" ref="floating" :style="floatingStyles">
      {{ referenceObject }}
    </div>
  </div>
</template>
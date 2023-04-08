<template>
    <button @click="start">点击</button>
    {{ show }}
    <SweepstakesPopUp v-model:show="show" />
</template>
<script setup>
import SweepstakesPopUp from '@/components/SweepstakesPop-up.vue';
import { ref } from 'vue';
const show = ref(false);

const start = () => {
    show.value = true;
}
</script>

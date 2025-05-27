<template>
  <NavMenu></NavMenu>
  <Highlight :hilight="hilightRef"></Highlight>
</template>
<script setup lang="ts">
import Highlight from '@/components/Highlight.vue';
import NavMenu from '@/components/NavMenu.vue';
import type { Hilight } from '@/models/MainModel';
import { ref, type Ref } from 'vue';

const hilightRef: Ref<Hilight> = ref({
  headWord: 'Stay Strong, Stay Steady, Stay Independent',
  sentence: '',
});
</script>

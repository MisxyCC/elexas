<template>
  <div class="flex flex-wrap w-full items-center justify-center gap-4">
    <h1 class="text-center text-blue-600 mb-2.5 text-2xl sm:text-4xl font-bold p-6">
      {{ props.hilight?.headWord }}
    </h1>
    <p>{{ props.hilight?.sentence }}</p>
  </div>
</template>
<script setup lang="ts">
import type { Hilight } from '@/models/MainModel';

const props = defineProps<{
  hilight?: Hilight;
}>();
</script>

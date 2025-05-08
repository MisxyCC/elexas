<template>
  <section class="getting-started bg-green-50 p-4 rounded-md mb-5">
    <h2 class="text-green-700 text-xl font-semibold mt-0 mb-2.5">{{ title }}</h2>
    <ul class="list-disc ml-5">
      <li v-for="tip in tips" :key="tip" class="mb-1.5">{{ tip }}</li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  tips: string[];
}>();
</script>

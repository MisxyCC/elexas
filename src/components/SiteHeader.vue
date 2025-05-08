<template>
  <header class="bg-blue-100 p-5 rounded-lg text-center">
    <h1 class="text-blue-600 mb-2.5 text-3xl sm:text-4xl font-bold">{{ title }}</h1>
    <p class="mb-4 text-base sm:text-lg">{{ description }}</p>
  </header>
</template>

<script setup lang="ts">
// Script setup for defineProps with TypeScript
defineProps<{
  title: string;
  description: string;
}>();
</script>

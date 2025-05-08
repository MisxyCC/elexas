<template>
  <div :id="id" class="bg-white p-5 mb-5 rounded-lg shadow-md">
    <h2 v-if="title" class="text-blue-600 mt-0 mb-4 text-2xl font-semibold">
      {{ title }}
    </h2>
    <h3 v-if="subtitle" class="text-blue-600 mt-4 mb-2.5 text-xl font-semibold">
      {{ subtitle }}
    </h3>
    <slot></slot>
</div>
</template>

<script setup lang="ts">
// Script setup for defineProps with TypeScript
defineProps<{
  id?: string; // Optional ID for the section, useful for anchor links.
  title?: string; // Optional title for the section.
  subtitle?: string; // Optional subtitle for the section.
}>();
</script>

<template>
  <div class="flex bg-orange-100 p-4 rounded-md mt-5 text-sm text-gray-700">
    <p><strong>Disclaimer:</strong> {{ content }}</p>
  </div>
</template>

<script setup lang="ts">
// Script setup for defineProps with TypeScript
defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="p-4 border border-gray-300 rounded-md bg-yellow-50">
    <h4 class="text-blue-600 font-semibold text-lg mb-2">{{ benefit.title }}</h4>
    <ul class="list-disc ml-5 text-gray-700 text-base sm:text-lg space-y-1">
      <li v-for="point in benefit.points" :key="point" v-html="formatPoint(point)"></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Import Benefit type for props definition
import type { Benefit } from '@/types'; // Adjust path if your types file is elsewhere

// Script setup for defineProps with TypeScript
const props = defineProps<{
  benefit: Benefit;
}>();

// Helper function to replace LaTeX-like arrows with HTML entities or Unicode
// This is a simple replacement; for full LaTeX, a library would be needed.
const formatPoint = (point: string): string => {
  return point
    .replace(/\(\$\\uparrow\$(.*?)\)/g, '(↑$1)') // Replace LaTeX up arrow
    .replace(/\(\$\\downarrow\$(.*?)\)/g, '(↓$1)'); // Replace LaTeX down arrow
};
</script>

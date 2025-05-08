<template>
  <section class="text-center my-5">
    <p v-if="primaryAction" class="mb-3">
      <a
        :href="primaryAction.href"
        class="inline-block bg-amber-400 hover:bg-amber-500 text-gray-800 py-3 px-6 no-underline rounded-md font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
      >
        {{ primaryAction.text }}
      </a>
    </p>
    <p v-if="secondaryAction">
      <a
        :href="secondaryAction.href"
        class="inline-block bg-sky-500 hover:bg-sky-600 text-white py-3 px-6 no-underline rounded-md font-bold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        {{ secondaryAction.text }}
      </a>
    </p>
  </section>
</template>

<script setup lang="ts">
// Import ActionLink type for props definition
import type { ActionLink } from '@/types'; // Adjust path if your types file is elsewhere

// Script setup for defineProps with TypeScript
defineProps<{
  primaryAction?: ActionLink; // Optional primary action link.
  secondaryAction?: ActionLink; // Optional secondary action link.
}>();
</script>

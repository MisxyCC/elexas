<template>
  <nav class="my-5 text-center">
    <ul class="list-none p-0 flex justify-around">
      <li v-for="item in navItems" :key="item.text" class="inline mx-3 sm:mx-4">
        <a
          :href="item.href"
          class="no-underline text-blue-600 font-bold text-base sm:text-lg hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-sm"
        >
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// Import NavItem type for props definition
import type { NavItem } from '@/types'; // Adjust path if your types file is elsewhere

// Script setup for defineProps with TypeScript
defineProps<{
  navItems: NavItem[];
}>();
</script>

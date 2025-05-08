<template>
  <footer class="text-center mt-8 py-6 border-t border-gray-200 text-gray-500 text-sm">
    <p>&copy; {{ year }} {{ websiteName }}. All rights reserved.</p>
  </footer>
</template>

<script setup lang="ts">
// Script setup for defineProps with TypeScript
defineProps<{
  year: number | string;
  websiteName: string;
}>();
</script>

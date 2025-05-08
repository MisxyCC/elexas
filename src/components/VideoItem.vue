<template>
  <div class="border border-gray-300 rounded-lg overflow-hidden shadow-md flex flex-col">
    <img :src="video.thumbnailSrc" :alt="video.thumbnailAlt" class="w-full h-48 object-cover" />
    <div class="p-4 bg-gray-50 flex-grow">
      <h4 class="text-blue-600 font-semibold text-lg mb-1">{{ video.title }}</h4>
      <p class="text-sm text-gray-700 mb-1"><strong>Focus:</strong> {{ video.focus }}</p>
      <p class="text-sm text-gray-700 mb-1"><strong>Duration:</strong> {{ video.duration }}</p>
      <p class="text-sm text-gray-700 mb-1"><strong>Equipment:</strong> {{ video.equipment }}</p>
      <p class="text-sm text-gray-700 mb-2"><strong>Level:</strong> {{ video.level }}</p>
      <a
        :href="video.videoLink"
        class="inline-block text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-orange-500 rounded-sm"
      >
        Watch Video &rarr;
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import VideoDetail type for props definition
import type { VideoDetail } from '@/types'; // Adjust path if your types file is elsewhere

// Script setup for defineProps with TypeScript
defineProps<{
  video: VideoDetail;
}>();
</script>

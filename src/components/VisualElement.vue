<template>
  <div class="visual-element text-center my-5">
    <img
      v-if="imageSrc"
      :src="imageSrc"
      :alt="imageAlt"
      class="min-w-full mx-auto rounded-lg shadow-md"
    />
    <p v-if="caption" class="text-sm text-gray-500 mt-2">{{ caption }}</p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// Script setup for defineProps with TypeScript
defineProps<{
  imageSrc?: string; // Optional image source URL.
  imageAlt?: string; // Optional alt text for the image.
  caption?: string; // Optional caption for the image.
}>();
</script>

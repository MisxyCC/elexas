<template>
  <div class="flex flex-wrap justify-center items-center py-8 lg:py-12 bg-[#E6FBF2]">
    <div class="mx-auto px-6 lg:px-10">
      <div class="flex flex-wrap mb-8 lg:mb-4 justify-center items-center">
        <p
          class="text-center pb-8 text-3xl lg:text-5xl font-bold text-[#1A2E25] leading-tight tracking-tight mb-5"
        >
          โปรแกรมการออกกำลังกายป้องกันการหกล้ม
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div v-for="risk in allRisks" :key="risk.title">
          <VideoItem></VideoItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CardDetail } from '@/models/CardDetail';
import { ref, type Ref } from 'vue';
import VideoItem from './VideoItem.vue';
const allRisks: Ref<CardDetail[]> = ref([
  {
    iconName: '',
    title: '',
    description: '',
  },
  {
    iconName: '',
    title: '',
    description: '',
  },
  {
    iconName: '',
    title: '',
    description: '',
  },
   {
    iconName: '',
    title: '',
    description: '',
  },
]);
</script>

<template>
  <div class="py-8 lg:py-12 bg-white">
    <div class="mx-auto px-6 lg:px-10">
      <div class="flex flex-wrap mb-8 lg:mb-4 justify-center items-center">
        <p
          class="text-center pb-8 text-3xl lg:text-5xl font-bold text-[#1A2E25] leading-tight tracking-tight mb-5"
        >
          การออกกำลังกายผ่านเว็บไซต์มีประโยชน์อย่างไร ?
        </p>
        <!-- <p class="text-lg lg:text-xl text-[#4B5563] font-light max-w-2xl mx-auto">
          Regular physical activity can significantly improve your quality of life. Our programs
          focus on gentle exercises that are safe and effective for seniors.
        </p> -->
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <div v-for="benefit in allBenefits" :key="benefit.title">
          <BenefitItem :model-value="benefit"></BenefitItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Benefit } from '@/models/Benefit';
import { ref, type Ref } from 'vue';
import BenefitItem from './BenefitItem.vue';

const allBenefits: Ref<Benefit[]> = ref([
  {
    iconName: 'directions_walk',
    title: 'Improved Mobility',
    description: 'เพื่อเพิ่มความแข็งแรงของกล้ามเนื้อและฝึกการทรงตัว ลดความเสี่ยงในการล้ม',
  },
  {
    iconName: 'directions_walk',
    title: 'Improved Mobility',
    description: 'ส่งเสริมคุณภาพชีวิตและความสามารถในการทำกิจวัตรประจำวัน',
  },
  {
    iconName: 'directions_walk',
    title: 'Improved Mobility',
    description: 'เข้าถึงง่าย สะดวก สามารถออกกำลังกายได้ที่บ้าน',
  },
  {
    iconName: 'directions_walk',
    title: 'Improved Mobility',
    description: 'ลดความเสี่ยงในการเจอมลพิษข้างนอก',
  },
  {
    iconName: 'directions_walk',
    title: 'Improved Mobility',
    description: 'ปลอดภัยจากโรคติดต่อ',
  },
  {
    iconName: 'diversity_1',
    title: 'Enhanced Mood',
    description: 'ปลอดภัยจากโรคติดต่อ',
  },
]);
</script>

<style scoped></style>

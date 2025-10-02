<template>
  <div class="py-8 lg:py-12 bg-[#E6FBF2]">
    <div class="mx-auto px-6 lg:px-10">
      <div class="flex flex-wrap mb-8 lg:mb-4 justify-center items-center">
        <p
          class="text-center pb-8 text-3xl lg:text-5xl font-bold text-[#1A2E25] leading-tight tracking-tight mb-5"
        >
          การออกกำลังกายผ่านเว็บไซต์มีประโยชน์อย่างไร ?
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <div v-for="benefit in allBenefits" :key="benefit.title">
          <CardItem :model-value="benefit"></CardItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardDetail } from '@/models/CardDetail';
import { ref, type Ref } from 'vue';
import CardItem from './CardItem.vue';

const allBenefits: Ref<CardDetail[]> = ref([
  {
    iconName: 'directions_walk',
    title:
      'เพิ่มความแข็งแรงของกล้ามเนื้อและความสามารถการทรงตัวในผู้สูงอายุ เพื่อลดความเสี่ยงในการหกล้ม',
    description: '',
  },
  {
    iconName: 'directions_walk',
    title: 'ส่งเสริมคุณภาพชีวิตและความสามารถในการทํากิจวัตรประจําวัน',
    description: '',
  },
  {
    iconName: 'directions_walk',
    title: 'เข้าถึงง่าย สะดวก สามารถออกกำลังกายได้ที่บ้าน',
    description: '',
  },
]);
</script>

<style scoped></style>

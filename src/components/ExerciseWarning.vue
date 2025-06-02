<template>
  <div class="flex flex-wrap justify-center items-center py-8 lg:py-12 bg-[#a9d6e5]">
    <div class="mx-auto px-6 lg:px-10">
      <div class="flex flex-wrap mb-8 lg:mb-4 justify-center items-center">
        <p
          class="text-center pb-8 text-3xl lg:text-5xl font-bold text-[#1A2E25] leading-tight tracking-tight mb-5"
        >
          ข้อคำแนะนำในการออกกำลังกาย
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        <div v-for="risk in allRisks" :key="risk.title">
          <CardItem :model-value="risk"></CardItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardDetail } from '@/models/CardDetail';
import { ref, type Ref } from 'vue';
import CardItem from './CardItem.vue';
const allRisks: Ref<CardDetail[]> = ref([
  {
    iconName: 'warning',
    title: 'ออกกำลังกายใกล้กับสิ่งของที่มั่นคง ยืนใกล้กำแพง และใช้โต๊ะหรือเก้าอี้ที่มีความมั่นคง',
    description: '',
  },
  {
    iconName: 'warning',
    title:
      'หากพบอาการผิดปกติใดๆขณะออกกำลังกาย เช่น วิงเวียนศีรษะ เจ็บหน้าอก หรือหายใจไม่อิ่ม (พูดไม่ได้เพราะหายใจเร็ว) ให้หยุดพักจนกว่าอาการจะดีขึ้น',
    description: '',
  },
  {
    iconName: 'warning',
    title:
      'หากอาการไม่ดีขึ้นหรือเกิดอุบัติเหตุ ให้กดปุ่มขอความช่วยเหลือ หรือสัญลักษณ์ SOS สีแดงที่หน้าจอ ระบบจะส่งแจ้งเตือนไปที่โทรศัพท์มือถือของญาติหรือผู้ดูแลที่ได้ลงทะเบียนไว้',
    description: '',
  },
]);
</script>

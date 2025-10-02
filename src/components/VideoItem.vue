<template>
  <Card class="shadow-lg hover:shadow-2xl transition-shadow duration-300 w-auto">
    <template #header>
      <img alt="card header" :src="model.imageUrl" class="w-full h-64 object-cover" />
    </template>
    <template #title>
      <div class="flex flex-col flex-wrap justify-center items-center gap-2 text-xl text-bold">
        {{ model.title }}
      </div>
    </template>
    <template #subtitle>
      <div class="flex flex-col flex-wrap justify-center items-center gap-2 text-xl">
        รายละเอียด
      </div>
    </template>
    <template #content>
      <div class="flex flex-col flex-wrap justify-center items-center gap-2 text-xl p-2">
        <p>ใช้เวลาประมาณ: {{ model.timeUsed }} นาที</p>
        <p>ประกอบไปด้วย:</p>
        <p v-for="(detail, index) in model.exerciseProgramDetail" :key="index">
          <Chip :label="exerciseProgramDetailTexts[index]" /> ใช้เวลาประมาณ
          {{ detail.estimateTotalSubProgramsTime }} นาที
        </p>
      </div>
    </template>
    <template #footer>
      <!-- <div class="flex flex-wrap justify-center items-center mt-1">
        <Button label="ออกกำลังกาย" class="w-auto" />
      </div> -->
      <div class="flex flex-wrap justify-center items-center mt-1">
        <button
          class="flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 mx-auto bg-teal-600 hover:bg-teal-700 text-white text-xl md:text-2xl font-semibold leading-normal tracking-wide border-2 border-transparent transition-all duration-300 ease-in-out transform hover:scale-105"
          @click="router.push('/exercise')"
        >
          <span class="truncate">เลือกโปรแกรมนี้</span>
        </button>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import type { VideoDetail } from '@/models/VideoDetail';
import Chip from 'primevue/chip';
import { useRouter } from 'vue-router';
const model = defineModel<VideoDetail>({
  default: {
    id: '',
    title: '',
    imageUrl: '',
    timeUsed: '',
    exerciseProgramDetail: [],
  },
});
const exerciseProgramDetailTexts: string[] = [
  model.value.exerciseProgramDetail[0]?.name +
    ' ' +
    model.value.exerciseProgramDetail[0]?.totalSubPrograms +
    ' ท่า',
  model.value.exerciseProgramDetail[1]?.name +
    ' ' +
    model.value.exerciseProgramDetail[1]?.totalSubPrograms +
    ' ท่า',
  model.value.exerciseProgramDetail[2]?.name +
    ' ' +
    model.value.exerciseProgramDetail[2]?.totalSubPrograms +
    ' ท่า',
  model.value.exerciseProgramDetail[3]?.name +
    ' ' +
    model.value.exerciseProgramDetail[3]?.totalSubPrograms +
    ' ท่า',
];
const router = useRouter();
</script>

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
        <div v-for="detail in allVideoDetails" :key="detail.id">
          <VideoItem :model-value="detail"></VideoItem>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ExerciseProgramName, type VideoDetail } from '@/models/VideoDetail';
import { ref, type Ref } from 'vue';
import VideoItem from './VideoItem.vue';
const allVideoDetails: Ref<VideoDetail[]> = ref([
  {
    id: 1,
    title: 'โปรแกรมออกกำลังกายเลเวล A',
    imageUrl: 'level-a.jpg',
    timeUsed: '1 ชั่วโมง 10 นาที',
    exerciseProgramDetail: [
      {
        name: ExerciseProgramName.Warmup,
        totalSubPrograms: 5,
        estimateTotalSubProgramsTime: 15,
      },
      {
        name: ExerciseProgramName.BalanceTraining,
        totalSubPrograms: 4,
        estimateTotalSubProgramsTime: 10,
      },
      {
        name: ExerciseProgramName.LegStrengthening,
        totalSubPrograms: 6,
        estimateTotalSubProgramsTime: 40,
      },
      {
        name: ExerciseProgramName.Cooldown,
        totalSubPrograms: 4,
        estimateTotalSubProgramsTime: 10,
      },
    ],
  },
  {
    id: 2,
    title: 'โปรแกรมออกกำลังกายเลเวล B',
    imageUrl: 'level-b.jpg',
    timeUsed: '1 ชั่วโมง 20 นาที',
    exerciseProgramDetail: [
      {
        name: ExerciseProgramName.Warmup,
        totalSubPrograms: 5,
        estimateTotalSubProgramsTime: 10,
      },
      {
        name: ExerciseProgramName.BalanceTraining,
        totalSubPrograms: 8,
        estimateTotalSubProgramsTime: 20,
      },
      {
        name: ExerciseProgramName.LegStrengthening,
        totalSubPrograms: 6,
        estimateTotalSubProgramsTime: 40,
      },
      {
        name: ExerciseProgramName.Cooldown,
        totalSubPrograms: 4,
        estimateTotalSubProgramsTime: 10,
      },
    ],
  },
  {
    id: 3,
    title: 'โปรแกรมออกกำลังกายเลเวล C',
    imageUrl: 'level-c.jpg',
    timeUsed: '1 ชั่วโมง 35 นาที',
    exerciseProgramDetail: [
      {
        name: ExerciseProgramName.Warmup,
        totalSubPrograms: 5,
        estimateTotalSubProgramsTime: 10,
      },
      {
        name: ExerciseProgramName.BalanceTraining,
        totalSubPrograms: 8,
        estimateTotalSubProgramsTime: 25,
      },
      {
        name: ExerciseProgramName.LegStrengthening,
        totalSubPrograms: 6,
        estimateTotalSubProgramsTime: 50,
      },
      {
        name: ExerciseProgramName.Cooldown,
        totalSubPrograms: 4,
        estimateTotalSubProgramsTime: 10,
      },
    ],
  },
  {
    id: 4,
    title: 'โปรแกรมออกกำลังกายเลเวล D',
    imageUrl: 'level-d.jpg',
    timeUsed: '1 ชั่วโมง 45 นาที',
    exerciseProgramDetail: [
      {
        name: ExerciseProgramName.Warmup,
        totalSubPrograms: 5,
        estimateTotalSubProgramsTime: 10,
      },
      {
        name: ExerciseProgramName.BalanceTraining,
        totalSubPrograms: 8,
        estimateTotalSubProgramsTime: 25,
      },
      {
        name: ExerciseProgramName.LegStrengthening,
        totalSubPrograms: 6,
        estimateTotalSubProgramsTime: 60,
      },
      {
        name: ExerciseProgramName.Cooldown,
        totalSubPrograms: 4,
        estimateTotalSubProgramsTime: 10,
      },
    ],
  },
]);
</script>

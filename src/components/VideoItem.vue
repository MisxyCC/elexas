<template>
  <Card class="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <template #header>
      <img alt="user header" src="@/assets/landing-img.png" class="w-full h-64 object-cover" />
    </template>
    <template #title>โปรแกรมออกกำลังกาย</template>
    <template #subtitle>Card subtitle</template>
    <template #content>
      <p class="m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
        repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
        ratione quam perferendis esse, cupiditate neque quas!
      </p>
    </template>
    <template #footer>
      <!-- <div class="flex flex-wrap justify-center items-center mt-1">
        <Button label="ออกกำลังกาย" class="w-auto" />
      </div> -->
      <div class="flex flex-wrap justify-center items-center mt-1">
        <button
          class="flex w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 mx-auto bg-[#30e89e] text-[#1A2E25] text-xl md:text-2xl font-semibold leading-normal tracking-wide border-2 border-transparent hover:border-[#30e89e] transition-all duration-300 ease-in-out transform hover:scale-105"
          @click="router.push('/video')"
        >
          <span class="truncate">เลือกโปรแกรมนี้</span>
        </button>
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import type { VideoDetail } from '@/models/VideoDetail';
import { useRouter } from 'vue-router';

const model = defineModel<VideoDetail>();
const router = useRouter();
</script>

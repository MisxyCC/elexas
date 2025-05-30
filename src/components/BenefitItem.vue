<template>
  <div
    class="flex flex-col items-center text-center p-8 bg-[#F9FAF8] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    <div class="text-[#30e89e] mb-6">
      <span class="material-icons-outlined" style="font-size: 64px">{{
        benefitModel.iconName
      }}</span>
    </div>
    <h3 class="text-2xl font-semibold text-[#1A2E25] mb-3">{{ benefitModel.title }}</h3>
    <p class="text-[#4B5563] text-lg font-light leading-relaxed">
      {{ benefitModel.description }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { Benefit } from '@/models/Benefit';

const benefitModel = defineModel<Benefit>({
  required: true,
});
</script>

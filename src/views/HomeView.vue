<template>
  <div class="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <NavMenu></NavMenu>
      <div class="flex-1">
        <HeroSection />
        <BenefitsSection />
        <ExerciseWarning />
        <VideoSection />
      </div>
      <FooterSection />
    </div>
  </div>
</template>
<script setup lang="ts">
import BenefitsSection from '@/components/BenefitsSection.vue';
import ExerciseWarning from '@/components/ExerciseWarning.vue';
import FooterSection from '@/components/FooterSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import NavMenu from '@/components/NavMenu.vue';
import VideoSection from '@/components/VideoSection.vue';
</script>

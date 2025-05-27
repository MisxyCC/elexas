<template>
  <div class="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <NavMenu></NavMenu>
      <div class="flex-1">
        <HeroSection />
        <BenefitsSection />
        <CallToActionSection />
      </div>
      <FooterSection />
    </div>
  </div>
</template>
<script setup lang="ts">
import BenefitsSection from '@/components/BenefitsSection.vue';
import CallToActionSection from '@/components/CallToActionSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import HeroSection from '@/components/HeroSection.vue';
import NavMenu from '@/components/NavMenu.vue';
</script>

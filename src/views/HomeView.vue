<template>
  <div class="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <NavMenu></NavMenu>
      <div class="flex-1">
        <WelcomeSection ref="welcome-section" />
        <BenefitsSection ref="benefit-section"/>
        <WarningSection ref="warning-section"/>
        <VideoSection ref="video-section"/>
      </div>
      <FooterSection />
    </div>
  </div>
</template>
<script setup lang="ts">
import BenefitsSection from '@/components/BenefitsSection.vue';
import WarningSection from '@/components/WarningSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import WelcomeSection from '@/components/WelcomeSection.vue';
import NavMenu from '@/components/NavMenu.vue';
import VideoSection from '@/components/VideoSection.vue';
import { useTemplateRef } from 'vue';

const welcomeSection = useTemplateRef('welcome-section');
const benefitSection = useTemplateRef('benefit-section');
const warningSection = useTemplateRef('warning-section');
const videoSection = useTemplateRef('video-section');
</script>

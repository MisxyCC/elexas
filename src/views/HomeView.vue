<template>
  <div class="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <NavMenu @navigate="handleNavigation"></NavMenu>
      <div class="flex-1">
        <WelcomeSection ref="welcomeSectionRef" id="welcome-section" />
        <BenefitsSection ref="benefitSectionRef" id="benefit-section" />
        <WarningSection ref="warningSectionRef" id="warning-section" />
        <VideoSection ref="videoSectionRef" id="video-section" />
      </div>
      <FooterSection />
    </div>
  </div>
</template>
<script setup lang="ts">
import BenefitsSection from '@/components/BenefitsSection.vue';
import FooterSection from '@/components/FooterSection.vue';
import NavMenu from '@/components/NavMenu.vue';
import VideoSection from '@/components/VideoSection.vue';
import WarningSection from '@/components/WarningSection.vue';
import WelcomeSection from '@/components/WelcomeSection.vue';
import { ref, type ComponentPublicInstance } from 'vue';

// Define types for component instance refs for better type safety
type WelcomeSectionInstance = InstanceType<typeof WelcomeSection>;
type BenefitsSectionInstance = InstanceType<typeof BenefitsSection>;
type WarningSectionInstance = InstanceType<typeof WarningSection>;
type VideoSectionInstance = InstanceType<typeof VideoSection>;

const welcomeSectionRef = ref<WelcomeSectionInstance | null>(null);
const benefitSectionRef = ref<BenefitsSectionInstance | null>(null);
const warningSectionRef = ref<WarningSectionInstance | null>(null);
const videoSectionRef = ref<VideoSectionInstance | null>(null);

const handleNavigation = (sectionName: string) => {
  let elementToScrollTo: HTMLElement | undefined | null;

  switch (sectionName) {
    case 'welcome-section':
      elementToScrollTo = (welcomeSectionRef.value as ComponentPublicInstance)?.$el;
      break;
    case 'benefit-section':
      elementToScrollTo = (benefitSectionRef.value as ComponentPublicInstance)?.$el;
      break;
    case 'warning-section':
      elementToScrollTo = (warningSectionRef.value as ComponentPublicInstance)?.$el;
      break;
    case 'video-section':
      elementToScrollTo = (videoSectionRef.value as ComponentPublicInstance)?.$el;
      break;
    default:
      console.warn(`[HomeView] Section "${sectionName}" not found.`);
      return;
  }

  if (elementToScrollTo) {
    elementToScrollTo.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(
      `[HomeView] Element for section "${sectionName}" not found or component not yet mounted.`
    );
  }
};
</script>

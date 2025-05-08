<template>
  <div class="font-sans antialiased min-h-screen bg-gray-100 text-gray-800 w-screen">
    <div class=" mx-auto px-4 py-5">
      <SiteHeader :title="site.title" :description="site.headerDescription" />
      <SiteNavigation :nav-items="navigation.items" />

      <ContentSection id="instructions" title="Navigating Our Website">
        <p class="mb-3 text-base sm:text-lg">Here's how to find your way around:</p>
        <ul class="list-disc ml-5 text-base sm:text-lg space-y-1">
          <li>Use the navigation menu at the top of the page to explore different sections.</li>
          <li>
            Visit the '<a href="#benefits" class="text-blue-600 hover:underline"
              >Benefits & Safety</a
            >' section to understand why exercise is important and when to take a break.
          </li>
          <li>
            Find a variety of exercise routines in our '<a
              href="#videos"
              class="text-blue-600 hover:underline"
              >Exercise Videos</a
            >' library.
          </li>
        </ul>
      </ContentSection>

      <ContentSection id="getting-started" title="Getting Started - Important Tips">
        <ul class="list-disc ml-5 text-base sm:text-lg space-y-1">
          <li v-for="tip in gettingStarted.tips" :key="tip">{{ tip }}</li>
        </ul>
      </ContentSection>

      <CallToAction :primary-action="cta.primary" :secondary-action="cta.secondary" />

      <VisualElement
        :image-src="visuals.main.src"
        :image-alt="visuals.main.alt"
        :caption="visuals.main.caption"
      />

      <ContentSection id="benefits" title="Understanding the Benefits and Exercising Safely">
        <ContentSection subtitle="Unlock a Healthier and More Vibrant You Through Exercise">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            <BenefitItem
              v-for="benefit in benefits.physical"
              :key="benefit.id"
              :benefit="benefit"
            />
            <BenefitItem v-for="benefit in benefits.mental" :key="benefit.id" :benefit="benefit" />
          </div>
          <VisualElement :caption="visuals.benefitsIcons.caption" class="mt-4">
            <div class="flex justify-center space-x-4 text-gray-500 text-2xl">
              <span>💪</span> <span>⚖️</span> <span>❤️</span> <span>🧠</span>
            </div>
          </VisualElement>
        </ContentSection>

        <ContentSection subtitle="Listen to Your Body: When to Take a Break" class="mt-6">
          <p class="leading-relaxed font-semibold text-red-600 text-base sm:text-lg">
            It's crucial to exercise safely. Stop immediately if you experience any of the
            following:
          </p>
          <ul
            class="list-disc ml-5 mt-3 space-y-1.5 leading-relaxed font-semibold text-red-600 text-base sm:text-lg"
          >
            <li v-for="sign in safety.stopSigns" :key="sign.title">
              <strong>{{ sign.title }}:</strong> {{ sign.description }}
            </li>
          </ul>
          <p class="mt-4 text-base sm:text-lg">
            <strong>Important Note:</strong> If you experience any of these signs, stop exercising
            immediately and consult with your doctor.
          </p>
          <VisualElement
            :image-src="visuals.resting.src"
            :image-alt="visuals.resting.alt"
            :caption="visuals.resting.caption"
            class="mt-4"
          />
        </ContentSection>
      </ContentSection>

      <ContentSection id="videos" title="Exercise Videos Designed for You">
        <p class="mb-3 text-base sm:text-lg">
          Explore our collection of safe and effective exercise videos. Choose the routines that
          best suit your fitness level and interests.
        </p>
        <h3 class="text-blue-600 mt-6 mb-3 text-xl font-semibold">Browse by Level</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          <VideoItem v-for="video in exerciseVideos.videos" :key="video.id" :video="video" />
        </div>
        <CallToAction :primary-action="cta.browseMoreVideos" class="mt-6" />
      </ContentSection>

      <ContentSection id="contact" title="Contact Us">
        <p class="text-base sm:text-lg">
          Have questions or feedback? We'd love to hear from you. Please feel free to reach out
          through our contact form or email us at
          <a :href="'mailto:' + site.contactEmail" class="text-blue-600 hover:underline">{{
            site.contactEmail
          }}</a
          >.
        </p>
      </ContentSection>

      <DisclaimerSection :content="site.disclaimer" />

      <SiteFooter :year="site.currentYear" :website-name="site.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Import components
import BenefitItem from '@/components/BenefitItem.vue';
import CallToAction from '@/components/CallToAction.vue';
import ContentSection from '@/components/ContentSection.vue';
import DisclaimerSection from '@/components/DisclaimerSection.vue';
import SiteFooter from '@/components/SiteFooter.vue';
import SiteHeader from '@/components/SiteHeader.vue';
import SiteNavigation from '@/components/SiteNavigation.vue';
import VideoItem from '@/components/VideoItem.vue';
import VisualElement from '@/components/VisualElement.vue';

// Import types
import type { ActionLink, Benefit, NavItem, VideoDetail } from '@/types'; // Adjust path if needed

// --- Reactive Data ---
const site = ref({
  name: 'NO MORE FALL',
  title: 'STAY ACTIVE, STAY WITH US, NO MORE FALL',
  headerDescription:
    'Welcome to NO MORE FALL, your dedicated resource for safe and effective exercise programs specifically designed for older adults to prevent falls. We are committed to helping you maintain your independence and well-being through targeted movement. Please remember to consult with your doctor before starting any new exercise program.',
  contactEmail: 'info@nomorefall.com',
  disclaimer:
    'The information provided on this website is for general guidance and informational purposes only, and does not constitute medical advice. It is essential to consult with your physician or other qualified healthcare provider before starting any new exercise program, especially if you have any pre-existing health conditions or concerns. NO MORE FALL is not responsible for any injuries or health issues that may arise from following the exercises described on this website. Always listen to your body and exercise within your own limits.',
  currentYear: new Date().getFullYear(),
});

const navigation = ref<{ items: NavItem[] }>({
  items: [
    { text: 'Benefits & Safety', href: '#benefits' },
    { text: 'Exercise Videos', href: '#videos' },
    { text: 'Contact Us', href: '#contact' },
  ],
});

const gettingStarted = ref<{ tips: string[] }>({
  tips: [
    'Start slowly and gradually increase the duration and intensity of your exercises.',
    'Wear comfortable clothing and supportive shoes to prevent injury and allow for ease of movement.',
    'Have water nearby to stay hydrated throughout your exercise routine.',
    'Listen carefully to your body. If you feel any pain, stop the exercise immediately and rest.',
    "Take breaks when needed. It's okay to pause and catch your breath.",
  ],
});

const cta = ref<{ primary: ActionLink; secondary?: ActionLink; browseMoreVideos: ActionLink }>({
  primary: {
    text: 'Explore our exercise videos and begin your journey to a healthier you!',
    href: '#videos',
  },
  secondary: { text: 'Learn more about the benefits of staying active.', href: '#benefits' },
  browseMoreVideos: { text: 'Browse our video library for more routines!', href: '#videos' },
});

const visuals = ref({
  main: {
    src: 'https://placehold.co/600x300/e3f2fd/1e88e5?text=Stay+Active',
    alt: 'Happy older adults exercising gently',
    caption: '[Placeholder for a welcoming image or muted video of gentle exercise]',
  },
  benefitsIcons: {
    caption: '[Placeholder for icons representing strength, balance, heart, brain, etc.]',
  },
  resting: {
    src: 'https://placehold.co/400x250/e0e0e0/757575?text=Rest+Safely',
    alt: 'Gentle image of someone resting',
    caption: '[Placeholder for a gentle image of someone resting]',
  },
});

const benefits = ref<{ physical: Benefit[]; mental: Benefit[] }>({
  physical: [
    {
      id: 'phys1',
      title: 'Improved Physical Health',
      points: [
        'Increased muscle strength and endurance ($\\uparrow$ Muscle Strength & Endurance)',
        'Better balance and reduced risk of falls ($\\downarrow$ Risk of Falls)',
        'Stronger bones and reduced risk of osteoporosis ($\\downarrow$ Osteoporosis Risk)',
        'Improved cardiovascular health ($\\uparrow$ Cardiovascular Health)',
        'Better management of chronic conditions (e.g., arthritis, diabetes)',
        'Increased flexibility and range of motion ($\\uparrow$ Flexibility & ROM)',
      ],
    },
  ],
  mental: [
    {
      id: 'mental1',
      title: 'Enhanced Mental and Emotional Well-being',
      points: [
        'Improved mood and reduced stress and anxiety ($\\downarrow$ Stress & Anxiety)',
        'Enhanced cognitive function and memory ($\\uparrow$ Cognitive Function)',
        'Increased energy levels ($\\uparrow$ Energy Levels)',
        'Opportunities for social interaction (if exercising in a group)',
        'Increased sense of independence and well-being',
      ],
    },
  ],
});

const safety = ref<{ stopSigns: { title: string; description: string }[] }>({
  stopSigns: [
    { title: 'Pain', description: 'Sharp or sudden pain, especially in joints or chest.' },
    { title: 'Dizziness or Lightheadedness', description: 'Feeling faint or unsteady.' },
    {
      title: 'Shortness of Breath',
      description: 'Difficulty breathing that is unusual for your activity level.',
    },
    { title: 'Chest Pain or Pressure', description: 'Any discomfort in the chest area.' },
    { title: 'Nausea or Vomiting', description: 'Feeling sick to your stomach.' },
    {
      title: 'Irregular Heartbeat',
      description: "Skipped beats or a racing pulse that doesn't feel normal.",
    },
    { title: 'Sudden Weakness or Numbness', description: 'Especially on one side of the body.' },
    { title: 'If you feel unwell in any way', description: "Don't push through it." },
  ],
});

const exerciseVideos = ref<{ videos: VideoDetail[] }>({
  videos: [
    {
      id: 'vid1',
      thumbnailSrc: 'https://placehold.co/300x200/d1c4e9/4527a0?text=Seated+Arm+Exercises',
      thumbnailAlt: 'Seated Exercise Video Thumbnail',
      title: 'Gentle Arm Exercises (Seated) - Level A',
      focus: 'Improves upper body strength and mobility.',
      duration: '12 minutes',
      equipment: 'Optional light dumbbells (1-2 lbs).',
      level: 'Level A (Beginner)',
      videoLink: '#video-player-1',
    },
    {
      id: 'vid2',
      thumbnailSrc: 'https://placehold.co/300x200/c8e6c9/2e7d32?text=Standing+Stretches',
      thumbnailAlt: 'Standing Stretch Video Thumbnail',
      title: 'Easy Standing Stretches for Flexibility - Level B',
      focus: 'Increases range of motion in legs and back.',
      duration: '15 minutes',
      equipment: 'Wall or sturdy chair for support.',
      level: 'Level B (Beginner/Intermediate)',
      videoLink: '#video-player-2',
    },
    {
      id: 'vid3',
      thumbnailSrc: 'https://placehold.co/300x200/bbdefb/1565c0?text=Balance+Exercises',
      thumbnailAlt: 'Balance Exercise Video Thumbnail',
      title: 'Balance Improvement Exercises - Level C',
      focus: 'Enhances stability and reduces the risk of falls.',
      duration: '18 minutes',
      equipment: 'None recommended.',
      level: 'Level C (Intermediate)',
      videoLink: '#video-player-3',
    },
    {
      id: 'vid4',
      thumbnailSrc: 'https://placehold.co/300x200/ffecb3/ff8f00?text=Strength+Training',
      thumbnailAlt: 'Strength Training Video Thumbnail',
      title: 'Gentle Strength Training with Bands - Level D',
      focus: 'Builds overall strength and endurance.',
      duration: '22 minutes',
      equipment: 'Resistance bands (light).',
      level: 'Level D (Intermediate/Advanced)',
      videoLink: '#video-player-4',
    },
  ],
});
</script>

<style scoped>
/* Global styles if needed, or import your main CSS file that includes Tailwind directives */
/* For example, if you haven't set up Tailwind globally in main.ts */
/* @import 'tailwindcss/base'; */
/* @import 'tailwindcss/components'; */
/* @import 'tailwindcss/utilities'; */

/* Custom focus ring style to match the original CSS for elements not covered by Tailwind's default focus utilities on links/buttons */
/* Tailwind's focus:ring utilities are generally preferred */
*:focus-visible {
  /* Modern approach for keyboard-only focus styling */
  outline: 2px solid #ff9800; /* Orange focus ring */
  outline-offset: 2px;
}
/* Remove default outline if using custom rings to avoid double outlines */
*:focus {
  outline: none;
}

/* Specificity might be needed if Tailwind's reset overrides this.
     Alternatively, use Tailwind's `focus:ring-orange-500` etc. directly on elements.
     The `SiteNavigation` and `CallToAction` components already use Tailwind focus rings.
     This global style is a fallback or for elements not explicitly styled.
  */
</style>

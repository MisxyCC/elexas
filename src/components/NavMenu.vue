<template>
  <nav class="fixed inset-x-0 top-0 bg-white shadow-lg z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a
            href="#welcome-section"
            @click.prevent="navigateToSection('welcome-section')"
            class="text-xl font-bold cursor-pointer"
          >
            NO MORE FALL
          </a>
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex justify-between space-x-4 gap-2">
            <a
              v-for="item in navigationItems"
              :key="item.name"
              :href="item.href"
              @click.prevent="navigateToSection(item.targetSection)"
              class="px-3 py-2 rounded-md text-lg font-medium text-gray-700 hover:bg-[#30e89e] transition-colors duration-300 cursor-pointer"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-controls="mobile-menu"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              v-show="!isMobileMenuOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-show="isMobileMenuOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div v-show="isMobileMenuOpen" class="md:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            v-for="item in navigationItems"
            :key="item.name"
            :href="item.href"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-500 hover:text-white block transition-colors duration-300 cursor-pointer"
            @click.prevent="navigateToSection(item.targetSection, true)"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import type { NavigationItem } from '@/models/NavigationItem';
import { ref } from 'vue';

const isMobileMenuOpen = ref<boolean>(false);
const emit = defineEmits(['navigate']);

const navigationItems = ref<NavigationItem[]>([
  { name: 'ประโยชน์ของการออกกำลังกาย', href: '#benefit-section', targetSection: 'benefit-section' },
  { name: 'คำแนะนำในการออกกำลังกาย', href: '#warning-section', targetSection: 'warning-section' },
  { name: 'โปรแกรมการออกกำลังกาย', href: '#video-section', targetSection: 'video-section' },
]);

const navigateToSection = (
  sectionName: string | undefined,
  isMobileClick: boolean = false
): void => {
  if (sectionName) {
    emit('navigate', sectionName);
    if (isMobileClick) {
      closeMobileMenu();
    }
  }
};
const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false;
};
</script>

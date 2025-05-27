<template>
  <footer class="bg-[#1A2E25] text-[#E5E7EB]">
    <div class="container mx-auto px-6 lg:px-10 py-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="text-center md:text-left">
          <a
            class="flex items-center justify-center md:justify-start gap-3 text-white mb-2"
            href="#"
          >
            <div class="size-7 text-[#30e89e]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clipPathIdFooter)">
                  <path
                    clip-rule="evenodd"
                    d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clipPathIdFooter">
                    <rect fill="white" height="48" width="48"></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h2 class="text-xl font-semibold leading-tight tracking-tight">Wellness Hub</h2>
          </a>
          <p class="text-base font-light">
            พัฒนาโดยคณะผู้วิจัยจากมหาวิทยาลัยนเรศวร ภายใต้โครงการวิจัย
            เพื่อการส่งเสริมสุขภาพผู้สูงอายุ
          </p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-6 text-lg">
          <a class="hover:text-[#30e89e] transition-colors font-medium" href="#">Privacy Policy</a>
          <a class="hover:text-[#30e89e] transition-colors font-medium" href="#"
            >Terms of Service</a
          >
          <a class="hover:text-[#30e89e] transition-colors font-medium" href="#">Contact Us</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script needed for this static component yet
</script>

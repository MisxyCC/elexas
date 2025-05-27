<template>
  <section
    class="relative min-h-[calc(100vh-80px)] flex items-center justify-center text-white bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600"
  >
    <div class="absolute inset-0">
      <img
        alt="Elders exercising in a park"
        class="w-full h-full object-cover opacity-50"
        src="../assets/landing-img.png"
      />
    </div>
    <div
      class="relative z-10 container mx-auto px-6 lg:px-10 py-20 flex flex-col items-center justify-center text-center gap-3"
    >
      <h1 class="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-center">
        เว็บไซต์สำหรับออกกำลังกายที่บ้านอย่างปลอดภัย สำหรับผู้สูงอายุ
      </h1>
      <p
        class="text-2xl md:text-3xl font-light leading-relaxed max-w-3xl mx-auto mb-10 text-center p-6"
      >
        เว็บไซต์นี้จัดทำขึ้นเพื่อให้ผู้สูงอายุสามารถออกกำลังกายได้อย่างปลอดภัยและมั่นใจจากที่บ้าน
        ด้วยโปรแกรมที่ออกแบบโดยนักกายภาพบำบัด ช่วยเพิ่มความแข็งแรง ลดความเสี่ยงในการหกล้ม ใช้งานง่าย
        เหมาะกับทุกคน โดยเฉพาะผู้สูงอายุที่อาจอยู่ตามลำพัง
      </p>
      <button
        class="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 mx-auto bg-[#30e89e] text-[#1A2E25] text-xl md:text-2xl font-semibold leading-normal tracking-wide hover:bg-[#F9FAF8] hover:text-[#30e89e] border-2 border-transparent hover:border-[#30e89e] transition-all duration-300 ease-in-out transform hover:scale-105"
        disabled
      >
        <span class="truncate">เพราะเราเชื่อว่า “การหกล้ม…ป้องกันได้”</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed for this static component yet
</script>

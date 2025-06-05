<template>
  <section class="p-2 w-full">
    <Card>
      <template #title>
        <div class="flex justify-center items-center">ข้อมูลสรุปการออกกำลังกาย</div>
      </template>
      <template #content>
        <div class="flex flex-col md:flex-row gap-2 justify-center items-center">
          <label for="username" class="text-xl">ชื่อผู้ใช้งาน</label>
          <InputText
            id="username"
            v-model="name"
            aria-describedby="username-help"
            readonly
            class="text-center"
          />
          <label for="age" class="text-xl">อายุ (ปี)</label>
          <InputText
            id="age"
            v-model="age"
            aria-describedby="username-help"
            readonly
            class="w-12"
          />
        </div>
      </template>
      <template #footer>
        <DataTable :value="exerciseConclusions" showGridlines tableStyle="min-width: 50rem">
          <Column field="currentDateTime" header="วัน เดือน ปี (เวลา)" class="text-xl">
            <template #body="slotProps">
              {{
                slotProps.data.currentDateTime.toLocaleString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
              }}
            </template>
          </Column>
          <Column
            field="averageHBP"
            header="ระยะเวลาที่ใช้ออกกำลังกาย (นาที)"
            class="text-xl"
          ></Column>
          <Column
            field="averageHBP"
            header="อัตราการเต้นของหัวใจโดยเฉลี่ย (ครั้ง/นาที)"
            class="text-xl"
          ></Column>
        </DataTable>
      </template>
    </Card>
  </section>
</template>
<script setup lang="ts">
import type { ExerciseConclusion } from '@/models/Conclusion';
import { ref, type Ref } from 'vue';

const name: Ref<string> = ref('นาย กินไก่ เคเอฟซี');
const age: Ref<string> = ref('20');

const exerciseConclusions: Ref<ExerciseConclusion[]> = ref([
  {
    currentDateTime: new Date(),
    totalUsedTime: '120 นาที',
    averageHBP: 120,
  },
]);
</script>

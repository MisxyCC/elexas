<template>
  <div class="min-h-screen flex flex-col min-w-screen">
    <!-- Header -->
    <header class="bg-[#E6FBF2] p-4 text-black text-center">
      <h1 class="text-xl font-bold">โปรแกรมออกกำลังกาย</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow p-4 w-full">
      <!-- Sidebar -->
      <aside class="p-2 flex flex-col md:flex-row gap-4">
        <Card class="w-full md:w-1/2">
          <template #title>
            <div class="flex justify-center items-center">ส่วนของการเชื่อมต่อ Bluetooth</div>
          </template>
          <template #content>
            <div class="flex flex-col md:flex-row gap-2 mt-1 justify-center items-center">
              <Button label="เชื่อมต่อ Bluetooth" @click="onConnectClicked" severity="success" />
              <Button label="เลิกเชื่อมต่อ Bluetooth" @click="onReset" severity="danger" />
            </div>
          </template>
        </Card>
        <Card class="w-full md:w-1/3">
          <template #title>
            <div class="flex justify-center items-center">สถานะการเชื่อมต่อ Bluetooth</div>
          </template>
          <template #content>
            <div class="flex justify-center items-center">
              <p class="text-xl">
                {{ isBluetoothConnected ? 'เชื่อมต่อสำเร็จ' : 'เชื่อมต่อไม่สำเร็จ' }}
              </p>
              <span
                :class="[
                  isBluetoothConnected
                    ? 'text-[#30e89e] material-icons-outlined'
                    : 'text-[#c1121f] material-icons-outlined',
                ]"
                style="font-size: 4rem"
                >{{ isBluetoothConnected ? 'check_circle' : 'error' }}</span
              >
            </div>
          </template>
        </Card>
        <Card class="w-full md:w-1/2">
          <template #title>
            <div class="flex justify-center items-center">อัตราการเต้นหัวใจ</div>
          </template>
          <template #content>
            <div class="flex flex-col md:flex-row gap-2 mt-1 justify-center items-center">
              <p class="text-6xl">{{ heartRateRef.heartRate?.toString() }}</p>
            </div>
          </template>
        </Card>
      </aside>

      <!-- Main Content Area -->
      <section class="p-2 w-full">
        <Card>
          <template #title>
            <div class="flex justify-center items-center">วีดีโอการออกกำลังกาย</div>
          </template>
          <template #content>
            <iframe
              class="w-full min-h-140"
              src="https://www.youtube.com/embed/1l2cW5jG0q8?si=WLTc7byk-_HBCek9"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </template>
          <template #footer>
            <div class="flex gap-4 pt-3 justify-center items-center">
              <Button
                label="สิ้นสุดการออกกำลังกาย"
                @click="onFinishExercise"
                severity="success"
                class="w-full md:w-auto"
              />
            </div>
          </template>
        </Card>
      </section>
      <ExerciseConclusion></ExerciseConclusion>
    </main>

    <FooterSection></FooterSection>
  </div>
</template>
<script setup lang="ts">
/// <reference types="web-bluetooth" />

import ExerciseConclusion from '@/components/ExerciseConclusion.vue';
import FooterSection from '@/components/FooterSection.vue';
import type { HeartRate } from '@/models/HeartRate';
import { parseHeartRate } from '@/utils';
import { onMounted, ref, type Ref } from 'vue';

onMounted(() => {
  window.scrollTo(0, 0);
});

let bluetoothDevice: BluetoothDevice | null = null;
let heartRateCharacter: BluetoothRemoteGATTCharacteristic | null = null;
const heartRateRef: Ref<HeartRate> = ref({ heartRate: 0 });
const isBluetoothConnected: Ref<boolean> = ref(false);

async function onDisconnected(event: Event): Promise<void> {
  console.log('ยกเลิกการเชื่อมต่อกับ Bluetooth');
  try {
    await onReset();
  } catch (error) {
    console.log('พบปัญหา: ' + error);
  }
}
function updateBluetoothConnectionStatus(): void {
  isBluetoothConnected.value = !isBluetoothConnected.value;
}
async function onReset(): Promise<void> {
  if (heartRateCharacter) {
    await heartRateCharacter?.stopNotifications();
    heartRateCharacter!.removeEventListener('characteristicvaluechanged', handleHeartRateChanged);
    heartRateCharacter = null;
    bluetoothDevice = null;
    heartRateRef.value.heartRate = 0;
    updateBluetoothConnectionStatus();
    console.log('อุปกรณ์ Bluetooth ถูกรีเซ็ทเรียบร้อย');
  }
}

async function requestDevice(): Promise<void> {
  console.log('รอผู้ใช้งานเลือกอุปกรณ์ Bluetooth..');
  bluetoothDevice = await navigator.bluetooth.requestDevice({
    filters: [
      {
        namePrefix: '808S',
      },
    ],
    optionalServices: ['heart_rate'],
  });
  console.log('ผู้ใช้งานเลือกอุปกรณ์ Bluetooth ชื่อ: ' + bluetoothDevice.name);
  bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
}

function handleHeartRateChanged(event: any): void {
  const value: any = event.target.value;
  heartRateRef.value = parseHeartRate(value);
}

async function connectDeviceAndCacheCharacteristic(): Promise<void> {
  if (bluetoothDevice?.gatt?.connected && heartRateCharacter) {
    return;
  }
  console.log('กำลังเชื่อมต่อกับ GATT เซิฟเวอร์...');
  const server: BluetoothRemoteGATTServer | undefined = await bluetoothDevice?.gatt?.connect();
  console.log('เชื่อมต่อกับบริการ heart_rate');
  const service = await server?.getPrimaryService('heart_rate');
  console.log('เชื่อมต่อกับคุณลักษณะ heart_rate_measurement');
  heartRateCharacter = (await service?.getCharacteristic('heart_rate_measurement')) || null;
  console.log('เริ่มการอ่านค่าอัตราการเต้นหัวใจ..');
  heartRateCharacter?.startNotifications();
  heartRateCharacter?.addEventListener('characteristicvaluechanged', handleHeartRateChanged);
  updateBluetoothConnectionStatus();
}
async function onConnectClicked(): Promise<void> {
  try {
    if (!bluetoothDevice) {
      await requestDevice();
    }
    await connectDeviceAndCacheCharacteristic();
  } catch (error) {
    console.log('ไม่สามารถเชื่อมต่อได้ เนื่องจาก ', error);
  }
}

function onFinishExercise(): void {}
</script>

<template>
  <div class="min-h-screen flex flex-col min-w-screen">
    <!-- Header -->
    <header class="bg-[#8ac926] p-4 text-white">
      <h1 class="text-2xl font-bold">Elder Excercise Assistant</h1>
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
        <Card class="w-full md:w-1/2">
          <template #title>
            <div class="flex justify-center items-center">อัตราการเต้นหัวใจ</div>
          </template>
          <template #content>
            <div class="flex flex-col md:flex-row gap-2 mt-1 justify-center items-center">
              <Avatar
                :label="heartRateRef.heartRate?.toString()"
                class="mr-2"
                size="xlarge"
                shape="square"
              />
            </div>
          </template>
        </Card>
      </aside>

      <!-- Main Content Area -->
      <section class="p-2 w-full">
        <Card>
          <template #title>วีดีโอการออกกำลังกาย</template>
          <template #content>
            <iframe
              class="w-full min-h-140"
              src="https://www.youtube.com/embed/A2wp8Ipxn9s?si=f91lxYNbNjcdeqOY"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </template>
        </Card>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-[#8ac926] p-4 text-white">
      <p>&copy; 2025 Misxy</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
/// <reference types="web-bluetooth" />

import type { HeartRate } from '@/models/HeartRate';
import { parseHeartRate } from '@/utils';
import { onMounted, ref, type Ref } from 'vue';

onMounted(() => {});

let bluetoothDevice: BluetoothDevice | null = null;
let heartRateCharacter: BluetoothRemoteGATTCharacteristic | null = null;
const heartRateRef: Ref<HeartRate> = ref({});

async function onDisconnected(event: Event): Promise<void> {
  console.log('ยกเลิกการเชื่อมต่อกับ Bluetooth');
  try {
    await onReset();
    await connectDeviceAndCacheCharacteristic();
  } catch (error) {
    console.log('พบปัญหา: ' + error);
  }
}

async function onReset(): Promise<void> {
  if (heartRateCharacter) {
    await heartRateCharacter?.stopNotifications();
    heartRateCharacter!.removeEventListener('characteristicvaluechanged', handleHeartRateChanged);
    heartRateCharacter = null;
    bluetoothDevice = null;
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
  console.log('อัตราการเต้นหัวใจ (ครั้ง) ต่อวินาที: ' + heartRateRef.value.heartRate);
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
}
async function onConnectClicked(): Promise<void> {
  try {
    if (!bluetoothDevice) {
      await requestDevice();
    }
    await connectDeviceAndCacheCharacteristic();
  } catch (_: any) {
    console.log('ไม่สามารถเชื่อมต่อได้');
  }
}
</script>

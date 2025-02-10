<template>
  <div class="min-h-screen flex flex-col min-w-screen">
    <!-- Header -->
    <header class="bg-blue-400 p-4 text-white">
      <h1 class="text-2xl font-bold">Elder Excercise Assistant</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow p-4 w-full">
      <!-- Sidebar -->
      <aside class="p-2 flex flex-col md:flex-row gap-4">
        <Card class="w-full md:w-1/2">
          <template #title>
            <div class="flex justify-center items-center">Bluetooth Section</div>
          </template>
          <template #content>
            <div class="flex flex-col md:flex-row gap-2 mt-1 justify-evenly">
              <Button label="เชื่อมต่อ Bluetooth" @click="onConnectClicked" severity="success" />
              <Button label="เลิกเชื่อมต่อ Bluetooth" @click="onReset" severity="danger" />
            </div>
          </template>
        </Card>
        <Textarea v-model="logDisplay" rows="5" cols="30" class="w-full" disabled />
      </aside>

      <!-- Main Content Area -->
      <section class="p-2 w-full">
        <Card>
          <template #title>Heart Rate Monitoring</template>
          <template #content>
            <!-- <Chart type="line" :data="chartData" :options="chartOptions" class="h-[20rem]" /> -->
          </template>
        </Card>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-blue-400 p-4 text-white">
      <p>&copy; 2025 Misxy</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
/// <reference types="web-bluetooth" />

import { logging } from '@/main';
import { parseHeartRate } from '@/utils';
import { onMounted, ref, type Ref } from 'vue';

onMounted(() => {});

const logDisplay: Ref<string> = ref('');

let bluetoothDevice: BluetoothDevice | null = null;
let heartRateCharacter: BluetoothRemoteGATTCharacteristic | null = null;
function log(message: string): void {
  logging.append(message);
  logDisplay.value = logging.getMessages();
}
function clearLogDisplay(): void {
  logging.clearAllMessages();
  logDisplay.value = '';
}

async function onDisconnected(event: Event): Promise<void> {
  log('ยกเลิกการเชื่อมต่อกับ Bluetooth');
  try {
    await onReset();
    await connectDeviceAndCacheCharacteristic();
  } catch (error) {
    log('พบปัญหา: ' + error);
  }
}

async function onReset(): Promise<void> {
  if (heartRateCharacter) {
    await heartRateCharacter?.stopNotifications().then((_) => {
      heartRateCharacter!.removeEventListener('characteristicvaluechanged', handleHeartRateChanged);
      heartRateCharacter = null;
      bluetoothDevice = null;
      clearLogDisplay();
      log('อุปกรณ์ Bluetooth ถูกรีเซ็ทเรียบร้อย');
    });
  }
}

async function requestDevice(): Promise<void> {
  log('รอผู้ใช้งานเลือกอุปกรณ์ Bluetooth..');
  bluetoothDevice = await navigator.bluetooth.requestDevice({
    filters: [
      {
        namePrefix: '808S',
      },
    ],
    optionalServices: ['heart_rate'],
  });
  log('ผู้ใช้งานเลือกอุปกรณ์ Bluetooth ชื่อ: ' + bluetoothDevice.name);
  bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
}

function handleHeartRateChanged(event: any): void {
  const value: any = event.target.value;
  log('อัตราการเต้นหัวใจ (ครั้ง) ต่อวินาที: ' + parseHeartRate(value).heartRate);
}

async function connectDeviceAndCacheCharacteristic(): Promise<void> {
  if (bluetoothDevice?.gatt?.connected && heartRateCharacter) {
    return;
  }
  log('กำลังเชื่อมต่อกับ GATT เซิฟเวอร์...');
  const server: BluetoothRemoteGATTServer | undefined = await bluetoothDevice?.gatt?.connect();
  log('เชื่อมต่อกับบริการ heart_rate');
  const service = await server?.getPrimaryService('heart_rate');
  log('เชื่อมต่อกับคุณลักษณะ heart_rate_measurement');
  heartRateCharacter = (await service?.getCharacteristic('heart_rate_measurement')) || null;
  log('เริ่มการอ่านค่าอัตราการเต้นหัวใจ..');
  heartRateCharacter?.startNotifications();
  heartRateCharacter?.addEventListener('characteristicvaluechanged', handleHeartRateChanged);
}
async function onConnectClicked(): Promise<void> {
  try {
    if (!bluetoothDevice) {
      await requestDevice();
    }
    await connectDeviceAndCacheCharacteristic();
  } catch (_: unknown) {
    log('ไม่สามารถเชื่อมต่อได้');
  }
}
</script>

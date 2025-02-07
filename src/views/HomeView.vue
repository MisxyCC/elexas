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
              <Button
                label="เลิกเชื่อมต่อ Bluetooth"
                @click="disconnectBluetooth"
                severity="danger"
              />
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
            <Chart type="line" :data="chartData" :options="chartOptions" class="h-[20rem]" />
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
import { exponentialBackoff, parseHeartRate } from '@/utils';
import { onMounted, ref, type Ref } from 'vue';

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
const logDisplay: Ref<string> = ref('');

let bluetoothDevice: BluetoothDevice | null = null;
let characteristic: BluetoothRemoteGATTCharacteristic | null = null;
function log(message: string): void {
  logging.append(message);
  logDisplay.value = logging.getMessages();
}
function clearLogDisplay(): void {
  logging.clearAllMessages();
  logDisplay.value = '';
}

function onDisconnected(): void {
  log('ยกเลิกการเชื่อมต่อกับ Bluetooth');
  connect();
}

async function onConnectClicked(): Promise<void> {
  bluetoothDevice = null;
  try {
    log('รอผู้ใช้งานเลือกอุปกรณ์ Bluetooth..');
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [
        {
          name: '808S 0002760',
        },
      ],
      optionalServices: ['heart_rate'],
    });
    log('ผู้ใช้งานเลือกอุปกรณ์ Bluetooth ชื่อ: ' + bluetoothDevice.name);
    bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
    connect();
  } catch (_: unknown) {
    log('ไม่สามารถเชื่อมต่อได้');
  }
}

async function connect(): Promise<void> {
  exponentialBackoff(
    3,
    3,
    async function toTry() {
      log('กำลังเชื่อมต่อไปยังอุปกรณ์ Bluetooth...');
      await bluetoothDevice?.gatt?.connect();
    },
    async function success() {
      log('เชื่อมต่ออุปกรณ์ Bluetooth: ' + bluetoothDevice?.name + ' สำเร็จ');
    },
    async function fail() {
      log('เชื่อมต่ออุปกรณ์ Bluetooth: ' + bluetoothDevice?.name + ' ไม่สำเร็จ');
    },
  );
}

function disconnectBluetooth(): void {
  //clearLogDisplay();
}

async function operateBluetooth(): Promise<void> {
  const option: RequestDeviceOptions = {
    filters: [
      {
        name: '808S 0002760',
      },
    ],
    //acceptAllDevices: true,
    optionalServices: ['heart_rate'],
  };
  navigator.bluetooth
    .requestDevice(option)
    .then((device) => device.gatt!.connect())
    .then((server) => server.getPrimaryService('heart_rate'))
    .then((service) => service.getCharacteristic('heart_rate_measurement'))
    .then((characteristic) => characteristic.startNotifications())
    .then((characteristic) => {
      characteristic.addEventListener(
        'characteristicvaluechanged',
        handleCharacteristicValueChanged,
      );
      console.log('Notifications have been started.');
    })
    .catch((error: Error) => {
      console.error(error);
    });

  function handleCharacteristicValueChanged(event: any) {
    const value = event.target.value;
    console.log('Received ', parseHeartRate(value));
  }
}

const setChartData = () => {
  //const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#8ecae6',
        tension: 0.4,
      },
      // {
      //   label: 'Second Dataset',
      //   data: [28, 48, 40, 19, 86, 27, 90],
      //   fill: false,
      //   borderColor: documentStyle.getPropertyValue('--p-gray-500'),
      //   tension: 0.4,
      // },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--p-text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>

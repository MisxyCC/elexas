<template>
  <div class="min-h-screen flex flex-col min-w-screen">
    <!-- Header -->
    <header class="bg-blue-400 p-4 text-white">
      <h1 class="text-2xl font-bold">Elder Excercise Assistant</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow p-4 w-full">
      <!-- Sidebar -->
      <aside class="p-2 flex flex-col md:flex-row gap-4 justify-between">
        <Card>
          <template #title>
            <div class="flex justify-center items-center">Bluetooth Section</div>
          </template>
          <template #content>
            <div class="flex flex-col md:flex-row gap-2 mt-1 justify-between">
              <Button label="Connect" @click="operateBluetooth" severity="success" />
              <Button label="Disconnect" severity="danger" class="" />
              <Button label="Listen Your Heart Rate" class="" />
              <Button label="Stop listening" class="" severity="info" />
            </div>
          </template>
        </Card>
        <Textarea v-model="textMessage" rows="5" cols="30" class="w-full" />
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
import type { HeartRate } from '@/models/HeartRate';
import { ref, onMounted, type Ref } from 'vue';

async function operateBluetooth(): Promise<void> {
  navigator.bluetooth
    .requestDevice({
      filters: [
        {
          name: '808S 0002760',
        },
      ],
      //acceptAllDevices: true,
      optionalServices: ['heart_rate'],
    })
    .then((device) => {
      console.log(`Device name is:${device.name}`)
      return device.gatt!.connect()
    })
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
    .catch((error) => {
      console.error(error);
    });

  function handleCharacteristicValueChanged(event: any) {
    const value = event.target.value;
    console.log('Received ', parseHeartRate(value));
  }
}

function parseHeartRate(value: any): HeartRate {
  // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
  value = value.buffer ? value : new DataView(value);
  let flags = value.getUint8(0);
  let rate16Bits: number = flags & 0x1;
  let result: HeartRate = {};
  let index = 1;
  if (rate16Bits) {
    result.heartRate = value.getUint16(index, /*littleEndian=*/ true);
    index += 2;
  } else {
    result.heartRate = value.getUint8(index);
    index += 1;
  }
  let contactDetected: number = flags & 0x2;
  let contactSensorPresent: number = flags & 0x4;
  if (contactSensorPresent) {
    result.contactDetected = !!contactDetected;
  }
  let energyPresent: number = flags & 0x8;
  if (energyPresent) {
    result.energyExpended = value.getUint16(index, /*littleEndian=*/ true);
    index += 2;
  }
  let rrIntervalPresent: number = flags & 0x10;
  if (rrIntervalPresent) {
    const rrIntervals = [];
    for (; index + 1 < value.byteLength; index += 2) {
      rrIntervals.push(value.getUint16(index, /*littleEndian=*/ true));
    }
    result.rrIntervals = rrIntervals;
  }
  return result;
}

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData: Ref<any, any> = ref();
const chartOptions: Ref<any, any> = ref();
const textMessage: Ref<any, any> = ref();

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

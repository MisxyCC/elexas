<template>
  <div class="min-h-screen flex flex-col w-full">
    <!-- Header -->
    <header class="bg-blue-400 p-4 text-white">
      <h1 class="text-2xl font-bold">Elder Excercise Assistant</h1>
    </header>

    <!-- Main Content -->
    <main class="flex-grow p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <!-- Sidebar -->
        <aside class="p-4 md:w-2/4">
          <Card>
            <template #title>
              <div class="flex justify-center items-center">Bluetooth Section</div>
            </template>
            <template #content>
              <div class="flex gap-2 mt-1">
                <Button label="Connect" class="w-full" />
                <Button label="Disconnect" severity="danger" class="w-full" />
                <Button label="Listen" class="w-full" />
                <Button label="Stop listening" class="w-full" severity="info" />
              </div>
            </template>
          </Card>
        </aside>

        <!-- Main Content Area -->
        <section class="p-4 md:w-3/4">
          <Card>
            <template #title>Heart Rate Monitoring</template>
            <template #content>
              <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
            </template>
          </Card>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-blue-400 p-4 text-white">
      <p>&copy; 2025 Misxy</p>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#c1121f',
        tension: 0.4,
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderColor: documentStyle.getPropertyValue('--p-gray-500'),
        tension: 0.4,
      },
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

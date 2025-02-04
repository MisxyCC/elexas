import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import { loggingStore } from './stores/logging';

const app = createApp(App);

app.use(createPinia());
app.use(router).use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});
app.mount('#app');
export const logging = loggingStore();

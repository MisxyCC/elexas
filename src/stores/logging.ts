import { time } from '@/utils';
import { defineStore } from 'pinia';

export const loggingStore = defineStore('logging', {
  state: () => {
    return { message: [] as string[] };
  },
  actions: {
    append(msg: string): void {
      this.message.push(time(msg) + '\n');
    },
    getMessages(): string {
      return this.message.join('');
    },
    clearAllMessages(): void {
      this.message.length = 0;
    },
  },
});

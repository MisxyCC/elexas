<template>
  <div class="flex flex-col gap-y-4">
    <div class="bg-black rounded-lg overflow-hidden shadow-md">
      <div id="youtube-player" class="block w-full h-auto rounded-lg aspect-video"></div>
    </div>

    <div class="flex gap-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-xl">
      <p class="mb-2 text-gray-700">
        <strong>สถานะ:</strong> <span :class="statusClass">{{ playbackStatus }}</span>
      </p>
      <p class="mb-2 text-gray-700">
        <strong>Played at least once: </strong>
        <span :class="playedOnce ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'">{{
          playedOnce ? 'Yes' : 'No'
        }}</span>
      </p>
      <p class="mb-2 text-gray-700">
        <strong>Current Time: </strong> {{ currentTime.toFixed(2) }}s
      </p>
      <p class="mb-2 text-gray-700">
        <strong>Duration: </strong> {{ duration > 0 ? duration.toFixed(2) : 'N/A' }}s
      </p>
      <p v-if="isVideoEnded" class="text-text-lg text-gray-700">
        <strong>Video has finished playing.</strong>
      </p>
    </div>

    <div class="flex flex-col md:flex-row gap-2 justify-center my-4">
      <button
        @click="playVideo"
        :disabled="isPlaying"
        class="py-2.5 px-5 bg-blue-500 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        เล่นวีดีโอออกกำลังกาย
      </button>
      <button
        @click="pauseVideo"
        :disabled="!isPlaying"
        class="py-2.5 px-5 bg-blue-500 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        หยุดชั่วคราว
      </button>
      <button
        @click="resetVideo"
        class="py-2.5 px-5 bg-[#ffc300] text-white rounded-md font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-[#ffd60a]"
      >
        สิ้นสุดการออกกำลังกาย
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
declare global {
  interface Window {
    YT: any;
  }
}
declare const YT: any;
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

// --- Type declaration for the YouTube Player API ---
// This prevents TypeScript errors for the 'YT' global variable.

// --- ID of the YouTube video you want to play ---
const videoId = '1l2cW5jG0q8'; // <-- REPLACE WITH YOUR YOUTUBE VIDEO ID

// --- Refs for player and reactive state ---
const player = ref<any | null>(null); // Ref to hold the YouTube player instance
const playbackStatus = ref<string>('ยังไม่ได้เล่นวีดีโอออกำลังกาย');
const playedOnce = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const isVideoEnded = ref<boolean>(false);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
let timeUpdateInterval: number | null = null; // To hold the interval for time updates
const currentTimeFormatted = ref('');
const statusClass = computed(() => {
  if (isPlaying.value) return 'text-blue-500 font-semibold';
  if (isVideoEnded.value) return 'text-purple-500 font-semibold';
  if (playedOnce.value && !isPlaying.value && !isVideoEnded.value)
    return 'text-yellow-600 font-semibold';
  return 'text-gray-500 font-semibold';
});

// --- YouTube Player API Event Handler ---

/**
 * This function is called by the YouTube API when the player's state changes.
 * It's the equivalent of the old HTML5 video events.
 */
const onPlayerStateChange = (event: any) => {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      console.log('Video playing event triggered');
      playbackStatus.value = 'Playing';
      isPlaying.value = true;
      isVideoEnded.value = false;
      if (!playedOnce.value) {
        playedOnce.value = true;
      }
      // Start polling for current time
      startTimeUpdater();
      break;

    case YT.PlayerState.PAUSED:
      console.log('Video pause event triggered');
      playbackStatus.value = 'Paused';
      isPlaying.value = false;
      // Stop polling for current time
      stopTimeUpdater();
      break;

    case YT.PlayerState.ENDED:
      console.log('Video ended event triggered');
      playbackStatus.value = 'Finished';
      playedOnce.value = true;
      isPlaying.value = false;
      isVideoEnded.value = true;
      // Stop polling for current time and set time to duration
      stopTimeUpdater();
      currentTime.value = duration.value;
      break;

    case YT.PlayerState.BUFFERING:
      console.log('Video is buffering');
      playbackStatus.value = 'Loading/Buffering...';
      break;

    // YT.PlayerState.CUED can be handled if needed
  }
};

/**
 * Called when the player is ready.
 * The equivalent of 'loadedmetadata'
 */
const onPlayerReady = (event: any) => {
  console.log('YouTube Player is ready.');
  duration.value = event.target.getDuration();
};

// --- Control Methods ---

const playVideo = () => {
  player.value?.playVideo();
};

const pauseVideo = () => {
  player.value?.pauseVideo();
};

const resetVideo = () => {
  if (player.value) {
    player.value.pauseVideo();
    player.value.seekTo(0, true); // Seek to the beginning
  }
  playedOnce.value = false;
  playbackStatus.value = 'Not played yet (reset)';
  isPlaying.value = false;
  isVideoEnded.value = false;
  currentTime.value = 0;
  console.log('Played status has been reset.');
};

// --- Time Update Emulation ---

/**
 * Starts an interval to regularly update the currentTime ref.
 */
const startTimeUpdater = () => {
  // Clear any existing interval
  if (timeUpdateInterval) clearInterval(timeUpdateInterval);

  timeUpdateInterval = window.setInterval(() => {
    if (player.value && typeof player.value.getCurrentTime === 'function') {
      currentTime.value = player.value.getCurrentTime();
      currentTimeFormatted.value = new Date(currentTime.value * 1000)
        .toISOString()
        .substring(14, 21);
    }
  }, 250); // Update every 250ms
};

/**
 * Stops the time update interval.
 */
const stopTimeUpdater = () => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
    timeUpdateInterval = null;
  }
};

// --- Player Initialization and Lifecycle Hooks ---

/**
 * Initializes the YouTube IFrame Player.
 */
const initializePlayer = () => {
  player.value = new YT.Player('youtube-player', {
    videoId: videoId,
    playerVars: {
      playsinline: 1, // Important for mobile browsers
      controls: 1, // Show native YouTube controls
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

onMounted(() => {
  // Check if the YouTube API script is already loaded
  if (window.YT && window.YT.Player) {
    initializePlayer();
  } else {
    // If not, load it
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    // The API will call this global function when it's ready
    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };
  }
});

onBeforeUnmount(() => {
  // Crucial: Clean up the player and the interval to prevent memory leaks
  stopTimeUpdater();
  player.value?.destroy();
  console.log('Component unmounting, player destroyed.');
});
</script>

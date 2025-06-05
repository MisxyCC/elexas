<template>
  <div class="font-sans max-w-2xl mx-auto my-8 p-6 bg-gray-50 rounded-xl shadow-lg">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-6">
      Vue 3 YouTube Player Detection
    </h1>
    <div class="mb-6 bg-black rounded-lg overflow-hidden shadow-md aspect-w-16 aspect-h-9">
      <!-- This div will be replaced by the YouTube iframe -->
      <div id="youtube-player-container" class="rounded-lg"></div>
    </div>
    <div class="bg-white p-4 rounded-lg mb-6 border border-gray-200 shadow-sm">
      <p class="mb-2 text-sm text-gray-700">
        <strong>Status:</strong> <span :class="statusClass">{{ playbackStatus }}</span>
      </p>
      <p class="mb-2 text-sm text-gray-700">
        <strong>Played at least once:</strong>
        <span :class="playedOnce ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'">{{
          playedOnce ? 'Yes' : 'No'
        }}</span>
      </p>
      <p class="mb-2 text-sm text-gray-700">
        <strong>Current Time:</strong> {{ currentTime.toFixed(2) }}s
      </p>
      <p class="mb-2 text-sm text-gray-700">
        <strong>Duration:</strong> {{ duration > 0 ? duration.toFixed(2) : 'N/A' }}s
      </p>
      <p v-if="isVideoEnded" class="text-sm text-gray-700">
        <strong>Video has finished playing.</strong>
      </p>
    </div>

    <div class="flex gap-3 justify-center">
      <button
        @click="playVideo"
        :disabled="isPlaying"
        class="py-2.5 px-5 bg-blue-500 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Play
      </button>
      <button
        @click="pauseVideo"
        :disabled="!isPlaying && !isVideoEnded"
        class="py-2.5 px-5 bg-blue-500 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Pause
      </button>
      <button
        @click="resetVideo"
        class="py-2.5 px-5 bg-blue-500 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-600"
      >
        Reset Played Status
      </button>
    </div>
    <div
      v-if="apiError"
      class="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm"
    >
      <strong>API Error:</strong> {{ apiError }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

// --- YouTube Player State Constants ---
// https://developers.google.com/youtube/iframe_api_reference#onStateChange
const YT_STATE_UNSTARTED = -1;
const YT_STATE_ENDED = 0;
const YT_STATE_PLAYING = 1;
const YT_STATE_PAUSED = 2;
const YT_STATE_BUFFERING = 3;
const YT_STATE_CUED = 5;

// --- Refs for player and reactive state ---
let player: YT.Player | null = null; // YouTube Player instance
const playbackStatus = ref<string>('Not played yet');
const playedOnce = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const isVideoEnded = ref<boolean>(false);
const currentTime = ref<number>(0);
const duration = ref<number>(0);
const apiError = ref<string | null>(null);
let timeUpdateInterval: number | null = null;

// YouTube Video ID to play (example: 'M7lc1UVf-VE' for "Big Buck Bunny")
const YOUTUBE_VIDEO_ID = '1l2cW5jG0q8'; // Replace with any YouTube video ID

// --- Computed property for status styling ---
const statusClass = computed(() => {
  if (isPlaying.value) return 'text-blue-500 font-semibold';
  if (isVideoEnded.value) return 'text-purple-500 font-semibold';
  if (playedOnce.value && !isPlaying.value && !isVideoEnded.value)
    return 'text-yellow-600 font-semibold'; // Paused after playing
  return 'text-gray-500 font-semibold';
});

// --- YouTube Player API Interaction ---

/**
 * Loads the YouTube IFrame Player API script using async/await.
 */
const loadYouTubeAPI = async (): Promise<void> => {
  apiError.value = null;
  if (window.YT && window.YT.Player) {
    console.log('YouTube API already loaded.');
    return Promise.resolve(); // API already loaded
  }

  return new Promise<void>((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      // Fallback if no script tags are found in the document, though unlikely in a Vue app.
      document.head.appendChild(tag);
    }

    // The API will call this global function when it's ready.
    (window as any).onYouTubeIframeAPIReady = () => {
      console.log('YouTube IFrame API Ready');
      resolve();
    };

    tag.onerror = (error) => {
      console.error('Failed to load YouTube API script:', error);
      apiError.value =
        'Failed to load YouTube API script. Check your internet connection or ad-blockers.';
      reject(error); // Reject the promise on error
    };
  });
};

/**
 * Initializes the YouTube player.
 */
const initializePlayer = () => {
  // Ensure YT API is loaded before attempting to use it.
  if (!window.YT || !window.YT.Player) {
    console.error('YouTube Player API not loaded or not ready yet.');
    apiError.value = 'YouTube Player API not available. Cannot initialize player.';
    // Optionally, you could try to load it again here or wait
    // loadYouTubeAPI().then(initializePlayer).catch(e => console.error("Retry load failed", e));
    return;
  }
  try {
    player = new YT.Player('youtube-player-container', {
      height: '100%', // Will be controlled by Tailwind aspect ratio parent
      width: '100%', // Will be controlled by Tailwind aspect ratio parent
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        playsinline: 1, // For mobile browsers
        autoplay: 0, // Don't autoplay
        controls: 1, // Show YouTube's default controls
        modestbranding: 1, // Less YouTube branding
        rel: 0, // Do not show related videos at the end
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  } catch (error) {
    console.error('Error initializing YouTube player:', error);
    apiError.value = `Error initializing YouTube player: ${error instanceof Error ? error.message : String(error)}`;
  }
};

/**
 * Called when the player is ready.
 */
const onPlayerReady = (event: YT.PlayerEvent) => {
  console.log('YouTube Player Ready:', event.target);
  // event.target.playVideo(); // Uncomment to autoplay
  if (player) {
    const playerDuration = player.getDuration();
    if (playerDuration > 0) {
      duration.value = playerDuration;
    }
  }
};

/**
 * Called when the player's state changes.
 */
const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
  console.log('YouTube Player State Change:', event.data);
  // playbackStatus.value = `YT State: ${event.data}`; // Raw state for debugging

  switch (event.data) {
    case YT_STATE_PLAYING:
      playbackStatus.value = 'Playing';
      if (!playedOnce.value) {
        playedOnce.value = true;
      }
      isPlaying.value = true;
      isVideoEnded.value = false;
      startUpdatingTime(); // Start polling for current time
      if (duration.value <= 0 && player) {
        // Fetch duration if not already set
        const playerDuration = player.getDuration();
        if (playerDuration > 0) duration.value = playerDuration;
      }
      break;
    case YT_STATE_PAUSED:
      playbackStatus.value = 'Paused';
      isPlaying.value = false;
      stopUpdatingTime(); // Stop polling
      break;
    case YT_STATE_ENDED:
      playbackStatus.value = 'Finished';
      playedOnce.value = true;
      isPlaying.value = false;
      isVideoEnded.value = true;
      currentTime.value = duration.value > 0 ? duration.value : 0; // Set current time to duration
      stopUpdatingTime();
      break;
    case YT_STATE_BUFFERING:
      playbackStatus.value = 'Buffering...';
      // isPlaying.value = true; // Or false, depending on how you want to represent buffering. Let's keep it as is from playing state.
      break;
    case YT_STATE_CUED:
      playbackStatus.value = 'Video Cued';
      isPlaying.value = false;
      isVideoEnded.value = false; // Ensure ended is false if a new video is cued
      if (player) {
        // Reset duration if a new video is cued
        const playerDuration = player.getDuration();
        duration.value = playerDuration > 0 ? playerDuration : 0;
        currentTime.value = 0; // Reset current time as well
      }
      break;
    case YT_STATE_UNSTARTED: // -1
      playbackStatus.value = 'Loading...'; // More user-friendly than 'Unstarted'
      isPlaying.value = false;
      break;
  }
};

/**
 * Called on player error.
 */
const onPlayerError = (event: YT.OnErrorEvent) => {
  console.error('YouTube Player Error:', event.data);
  playbackStatus.value = `Error: ${event.data}`;
  apiError.value = `YouTube Player Error Code: ${event.data}. Common issues: video unavailable, private, or deleted. Check console for details.`;
  isPlaying.value = false;
  stopUpdatingTime();
};

/**
 * Starts polling for current time. YouTube API doesn't have a native 'timeupdate' like HTML5.
 */
const startUpdatingTime = () => {
  if (timeUpdateInterval) clearInterval(timeUpdateInterval); // Clear existing interval if any
  timeUpdateInterval = setInterval(() => {
    if (player && typeof player.getCurrentTime === 'function') {
      const current = player.getCurrentTime();
      if (current !== undefined) {
        // getCurrentTime can return undefined if not ready
        currentTime.value = current;
      }
    }
  }, 250); // Update every 250ms
};

/**
 * Stops polling for current time.
 */
const stopUpdatingTime = () => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval);
    timeUpdateInterval = null;
  }
};

// --- Control Methods ---

const playVideo = () => {
  if (player && typeof player.playVideo === 'function') {
    player.playVideo();
  } else {
    console.warn('Player not available or not ready to play video.');
    apiError.value = 'Player not ready or not found. Cannot play video.';
  }
};

const pauseVideo = () => {
  if (player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
  } else {
    console.warn('Player not available or not ready to pause video.');
    // No apiError here as it might be a valid state (e.g. player not yet initialized)
  }
};

const resetVideo = () => {
  if (player && typeof player.seekTo === 'function' && typeof player.pauseVideo === 'function') {
    player.pauseVideo(); // Pause first
    player.seekTo(0, true); // Seek to beginning, true allows seek ahead
    // YT player might go into BUFFERING or PLAYING state after seekTo,
    // so onPlayerStateChange will handle isPlaying and playbackStatus.
    // We will manually set some states here for immediate feedback.
  }
  playedOnce.value = false;
  playbackStatus.value = 'Not played yet (reset)';
  isPlaying.value = false; // Manually set, player state change might override
  isVideoEnded.value = false;
  currentTime.value = 0;
  stopUpdatingTime();
  console.log('Played status has been reset, video seeked to start.');
};

// --- Lifecycle Hooks ---
onMounted(async () => {
  try {
    await loadYouTubeAPI(); // loadYouTubeAPI itself is now async
    // The global onYouTubeIframeAPIReady function (defined in loadYouTubeAPI)
    // is responsible for calling initializePlayer when the API is ready.
    // If the API was already loaded, loadYouTubeAPI resolves immediately,
    // and we can proceed to initialize.
    if (window.YT && window.YT.Player && !player) {
      // Ensure player isn't already initialized
      initializePlayer();
    }
  } catch (error) {
    console.error('Failed to load YouTube API on mount:', error);
    // apiError is set within loadYouTubeAPI if it fails.
  }
});

onBeforeUnmount(() => {
  stopUpdatingTime();
  if (player && typeof player.destroy === 'function') {
    player.destroy();
    player = null;
  }
  // Clean up the global callback to prevent issues if the component is re-mounted,
  // or if other components also try to define it.
  if ((window as any).onYouTubeIframeAPIReady) {
    delete (window as any).onYouTubeIframeAPIReady;
  }
});
</script>

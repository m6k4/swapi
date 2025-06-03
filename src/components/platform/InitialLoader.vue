<template>
  <div
    class="InitialLoader"
    :class="{
      'InitialLoader--hide-loader': isHidden,
    }"
  >
    <button v-if="!showLoadingContainer" @click="showLoading()">
      Go to the dark side
    </button>
    <div v-else class="InitialLoader__loading-container">
      <div class="InitialLoader__lightSaber">
        <div class="InitialLoader__lightSaber-handle"></div>
        <div
          class="InitialLoader__lightSaber-blade"
          :class="{ show: showBlade }"
        ></div>
      </div>
      <div class="InitialLoader__loading-text">Loading...</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import bladeSound from "@/assets/audio/lightsaber-sound.mp3";
import { useSoundControl } from "@/composables/useSoundControl";

const { isMuted } = useSoundControl();

const showLoadingContainer = ref(false);
const showBlade = ref(false);
const isHidden = ref(false);

const playSound = () => {
  const audio = new Audio(bladeSound);
  audio.play();
};

const showLoading = () => {
  showLoadingContainer.value = true;
  setTimeout(() => {
    if (!isMuted.value) {
      playSound();
    }
    showBlade.value = true;
  }, 1000);

  setTimeout(() => {
    isHidden.value = true;
  }, 4500);
};
</script>

<style scoped lang="scss">
.InitialLoader {
  height: 100vh;
  width: 100vw;
  background-color: $background-color-dark;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  &__lightSaber {
    position: relative;
    width: 50rem;
    height: 3rem;
    background-color: transparent;
    border-radius: 5rem 5rem 5rem 5rem;
  }

  &__lightSaber-handle {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 13rem;
    height: 1rem;
    background-image: url("@/assets/img/light-saber-handle.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    animation: smoothShow 1s ease-out;
  }

  &__lightSaber-blade {
    position: absolute;
    bottom: 0;
    left: 13rem;
    width: 0;
    height: 1rem;
    background: linear-gradient(to right, $primary-color, $primary-color 1rem);
    border-radius: 0 5rem 5rem 0;
    animation-fill-mode: forwards;
    transition:
      width 3s ease-in-out,
      box-shadow 0.5s ease-in-out;
  }

  &__lightSaber-blade.show {
    width: 32rem;
    box-shadow:
      0 0 8px 2px $text-color-light,
      0 0 16px 3px $text-color-light,
      0 0 35px 8px $text-color-light;
  }

  &__loading-text {
    font-size: 3rem;
    color: $text-color-light;
    text-shadow:
      0 0 8px $primary-color,
      0 0 16px $primary-color,
      0 0 35px $primary-color;
    animation: smoothShow 1.5s ease-out;
    animation-delay: 1s;
    animation-fill-mode: backwards;
  }

  &--hide-loader {
    animation: hideLoader 1s ease-out;
    animation-fill-mode: forwards;
  }
}

@keyframes smoothShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hideLoader {
  0% {
    top: 0;
  }
  100% {
    top: -100vh;
  }
}

@media screen and (max-width: 768px) {
  .InitialLoader {
    &__lightSaber {
      width: 30rem;
    }

    &__lightSaber-handle {
      width: 8rem;
    }

    &__lightSaber-blade {
      left: 8rem;
    }

    &__lightSaber-blade.show {
      width: 22rem;
    }
  }
}
</style>

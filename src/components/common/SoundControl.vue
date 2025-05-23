<script setup lang="ts">
import { useSoundControl } from "@/composables/useSoundControl";

const { isMuted, toggleSound } = useSoundControl();
</script>
<template>
  <div class="SoundControl">
    <i
      v-if="isMuted"
      class="SoundControl__icon pi pi-volume-off"
      @click="toggleSound()"
    ></i>
    <i
      v-else
      class="SoundControl__icon pi pi-volume-up"
      @click="toggleSound()"
    ></i>
  </div>
</template>
<style scoped lang="scss">
.SoundControl {
  position: fixed;
  top: 0;
  right: 0;
  margin: 6rem 8rem;
  z-index: 1000;

  &__icon {
    transition: all 0.3s ease-in-out;
    font-size: 3rem;
    color: $primary-color;

    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
}

@media screen and (max-width: 1200px) {
  .SoundControl {
    margin: 2rem;
  }
}
</style>

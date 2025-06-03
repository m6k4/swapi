<template>
  <div class="SpaceBackground"></div>
</template>
<style scoped lang="scss">
.SpaceBackground {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  animation: slowlyZoom 60s linear;
  animation-fill-mode: forwards;
}

@keyframes slowlyZoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.8);
  }
}
</style>

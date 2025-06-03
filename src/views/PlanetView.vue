<script setup lang="ts">
import FilterPanel from "@/components/planet/FilterPanel.vue";
import PlanetList from "@/components/planet/PlanetList.vue";
import CommonPagination from "@/components/platform/CommonPagination.vue";
import { usePlanet } from "@/composables/usePlanet";
import Toast from "primevue/toast";
import MusicPlayer from "@/components/platform/SoundControl.vue";
import InitialLoader from "@/components/platform/InitialLoader.vue";
import SpaceBackground from "@/components/platform/SpaceBackground.vue";

const { planetsCount, page, fetch, setPage, setParamsBasedOnRoute } =
  usePlanet();

setParamsBasedOnRoute();
fetch();

const changePage = (newPage: number) => {
  setPage(newPage);
};
</script>

<template>
  <SpaceBackground />
  <InitialLoader />
  <Toast />
  <div class="PlatformView">
    <MusicPlayer />
    <FilterPanel />
    <div class="PlatformView__content">
      <PlanetList />
    </div>
    <CommonPagination
      v-if="planetsCount > 10"
      class="PlatformView__pagination"
      :total-items="planetsCount"
      :current-page="page"
      :items-per-page="10"
      @set-page="changePage"
    />
  </div>
</template>

<style scoped lang="scss">
.PlatformView {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 6rem 8rem;

  &__content {
    margin-top: 8rem;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 4rem;
  }
}

@media screen and (max-width: 768px) {
  .PlatformView {
    padding: 6rem 2rem;
  }
}
</style>

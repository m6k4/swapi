<script setup lang="ts">
import PlanetListItem from "@/components/planet/PlanetListItem.vue";
import EmptyList from "@/components/platform/EmptyList.vue";
import { usePlanet } from "@/composables/usePlanet";

const { planets } = usePlanet();
</script>

<template>
  <div class="PlanetList">
    <div class="PlanetList__container">
      <EmptyList v-if="planets.length === 0" />
      <div v-else class="PlanetList__elements">
        <PlanetListItem
          v-for="planet in planets"
          :key="planet.getName()"
          :planet="planet"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.PlanetList {
  font-size: 1.6rem;

  &__elements {
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 4rem;
  }
}
</style>

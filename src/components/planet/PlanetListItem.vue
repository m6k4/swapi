<script setup lang="ts">
import Planet from "@/components/planet/types/Planet";

const props = defineProps<{
  planet: Planet;
}>();

const getPlanetImage = (): string => {
  return new URL(
    `../../assets/img/${props.planet.getImageName()}`,
    import.meta.url,
  ).href;
};
</script>

<template>
  <div class="PlanetListItem">
    <div class="PlanetListItem__container">
      <div class="PlanetListItem__image">
        <img :src="getPlanetImage()" :alt="planet.getName()" />
      </div>
      <div class="PlanetListItem__details">
        <h2>{{ planet.getName() }}</h2>
        <p>Created at: {{ planet.getCreated() }}</p>
        <p>Climate: {{ planet.getClimate() }}</p>
        <p>Gravity: {{ planet.getGravity() }}</p>
        <p>Population: {{ planet.getPopulation() }}</p>
        <p>Rotation period: {{ planet.getRotationPeriod() }}</p>
        <p>
          Url:
          <a :href="planet.getUrl()" target="_blank">
            {{ planet.getUrl() }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.PlanetListItem {
  width: 45rem;
  margin: 4rem 2rem;

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: calc(15rem - 5%) 2rem 4rem 2rem;
    background-color: rgba($background-color, 0.8);
    border-radius: 1rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 2rem $primary-hover-color;
    }
  }

  &__image {
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;

    img {
      width: 15rem;
      height: 100%;
      border-radius: 1rem;
      object-fit: cover;
      transition: all 0.3s ease-in-out;
    }
  }

  &__details {
    letter-spacing: 1.2px;

    a {
      font-size: 1.4rem;
    }
  }

  &__container:hover &__image img {
    transform: scale(1.15);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 768px) {
  .PlanetListItem {
    margin: 3rem 0;
  }
}
</style>

<script setup lang="ts">
import SearchBar from "@/components/planet/SearchBar.vue";
import { usePlanet } from "@/composables/usePlanet";
import Select from "primevue/select";
import { ref, type Ref } from "vue";
import { planetsSortOptions } from "@/utils/constants";
import { type SortOption } from "@/types/types";
import { useRouter } from "vue-router";

const { setFilter, setSort, clearFilters } = usePlanet();

const router = useRouter();
const searchBarRef = ref<InstanceType<typeof SearchBar> | null>(null);
const sortOptions: SortOption[] = planetsSortOptions;
const selectedSortOption: Ref<SortOption | null> = ref(null);
const defaultSearchValue = ref("");

const filterQuery = router.currentRoute.value.query.filter;
const sortQuery = router.currentRoute.value.query.sort;

if (filterQuery) {
  defaultSearchValue.value = filterQuery as string;
}
if (sortQuery) {
  const sortOption = sortOptions.find((option) => option.code === sortQuery);
  if (sortOption) {
    selectedSortOption.value = sortOption;
  }
}

const setSearchedName = (searchedName: string) => {
  setFilter(searchedName);
};

const setSortOption = () => {
  if (selectedSortOption.value) {
    setSort(selectedSortOption.value);
  }
};

const clearAllFilters = () => {
  if (searchBarRef.value) {
    searchBarRef.value.clearSearchedValue();
  }
  selectedSortOption.value = null;
  clearFilters();
};
</script>

<template>
  <div class="FilterPanel">
    <SearchBar
      ref="searchBarRef"
      class="FilterPanel__searchBar"
      :default-value="defaultSearchValue"
      @search="setSearchedName"
    />
    <Select
      v-model="selectedSortOption"
      class="FilterPanel__select"
      :options="sortOptions"
      option-label="sort"
      placeholder="Sort by:"
      @change="setSortOption()"
    />
    <button class="FilterPanel__clear-button" @click="clearAllFilters()">
      Clear
      <i class="pi pi-times" />
    </button>
  </div>
</template>
<style scoped lang="scss">
.FilterPanel {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;

  &__searchBar {
    min-width: 40rem;
  }

  &__select {
    min-width: 25rem;
  }

  &__clear-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    color: $primary-color;
    background-color: $background-color;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background-color: $primary-hover-color;
      color: $background-color;
    }
  }
}

@media screen and (max-width: 1200px) {
  .FilterPanel {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;

    &__searchBar,
    &__select,
    &__clear-button {
      min-width: 50%;
      width: 50%;
    }
  }
}

@media screen and (max-width: 768px) {
  .FilterPanel {
    &__searchBar,
    &__select,
    &__clear-button {
      min-width: 100%;
      width: 100%;
    }
  }
}
</style>

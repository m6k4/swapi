<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits(["search"]);
const props = defineProps<{
  defaultValue: string;
}>();

const searchedValue = ref("");

watch(
  () => props.defaultValue,
  (newValue) => {
    searchedValue.value = newValue;
  },
  { immediate: true },
);

const handleSearch = () => {
  emit("search", searchedValue.value);
};

const clearSearchedValue = () => {
  searchedValue.value = "";
};

defineExpose({
  clearSearchedValue,
});
</script>

<template>
  <input
    v-model="searchedValue"
    class="SearchBar"
    type="text"
    placeholder="Search for a planet..."
    @input="handleSearch"
  />
</template>
<style scoped lang="scss">
.SearchBar {
  font-size: 1.6rem;
  margin: 0;
  padding: 1rem 2rem;
}
</style>

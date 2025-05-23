<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}>();

const emit = defineEmits<{
  (e: "setPage", page: number): void;
}>();

const pageCount = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});
</script>

<template>
  <div class="CommonPagination">
    <button
      class="CommonPagination__button"
      :disabled="currentPage === 1"
      @click="emit('setPage', currentPage - 1)"
    >
      <i class="pi pi-arrow-left" />
    </button>
    <span>Page {{ currentPage }} of {{ pageCount }}</span>
    <button
      class="CommonPagination__button"
      :disabled="currentPage === pageCount"
      @click="emit('setPage', currentPage + 1)"
    >
      <i class="pi pi-arrow-right" />
    </button>
  </div>
</template>
<style scoped lang="scss">
.CommonPagination {
  &__button {
    padding: 1rem 1.5rem;
  }
}
</style>

import { ref, type Ref } from 'vue';
import  { type RequestInterface, type SortOption,  SortByDateOptions, SortByNameOptions } from '@/types/types';
import Planet from '@/components/planet/types/Planet';
import http from "@/utils/http";
import dayjs from 'dayjs';
import { useRoute, useRouter,  } from 'vue-router';
import { planetsSortOptions } from "@/utils/constants";
import type { QueryParams } from "@/types/types";

const planets = ref<Array<Planet>>([]);
const planetsCount = ref<number>(0);
const filterCriteria = ref<string>("");
const sortCriteria = ref<SortOption | null>(null);
const page = ref<number>(1);

export function usePlanet(): {
  planets: Ref<Array<Planet>>,
  planetsCount: Ref<number>,
  page: Ref<number>,
  setParamsBasedOnRoute: () => void,
  fetch: () => Promise<void>,
  clearFilters: () => void,
  setFilter: (name: string) => void,
  setSort: (sort: SortOption | null) => void,
  setPage: (page: number) => void
  } {

  const route = useRoute();
  const router = useRouter();

  const setParamsBasedOnRoute = (): void => {
    const filterQuery = router.currentRoute.value.query.filter;
    const sortQuery = router.currentRoute.value.query.sort;
    const sortOption = sortQuery ? planetsSortOptions.find((option) => option.code === sortQuery) : null;

    filterCriteria.value = filterQuery ? filterQuery.toString() : "";
    sortCriteria.value = sortOption ? sortOption : null;
    page.value = parseInt(router.currentRoute.value.query.page as string) || 1;
  }

  const fetch = async (): Promise<void> => {
    await http
      .get<RequestInterface>(`/planets/${parseFilterOption()}page=${page.value}`)
      .then((response) => {
        const data = response.data;
        planetsCount.value = data.count;
        const results = data.results;
        

        if(!results) {
          return;
        }
      
        planets.value = results.map((planet) => Planet.fromDTO(planet));

        if (sortCriteria.value) {
          sortList(sortCriteria.value);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  const clearFilters = (): void => {
    filterCriteria.value = "";
    sortCriteria.value = null;
    page.value = 1;
    updateQueryParams({ filter: "", sort: "", page: "1" });
    fetch();
  }
  const setPage = (newPage: number): void => {
    page.value = newPage;
    updateQueryParams({ page: `${newPage}` });
    fetch();
  }

  const setFilter = (filter: string): void => {
    filterCriteria.value = filter;
    page.value = 1;
    updateQueryParams({ filter, page: '1' });
    fetch();
  }

  const setSort = (sort: SortOption | null): void => {
    sortCriteria.value = sort;
    if (sort) {
      sortList(sort);
    }
    updateQueryParams({ sort: sort?.code || "" });
  }
  const sortList = (sorting: SortOption): void => {
    if (sorting.code === SortByDateOptions.NEWEST || sorting.code === SortByDateOptions.OLDEST) {
      sortByDate(sorting.code);
    } else if (sorting.code === SortByNameOptions.A_TO_Z || sorting.code === SortByNameOptions.Z_TO_A) {
      sortByName(sorting.code);
    }
  }

  const sortByDate = (sortDirection: SortByDateOptions): void => {
    planets.value.sort((a, b) => {
      const dateA = dayjs(a.getCreated(), 'DD/MM/YYYY');
        const dateB = dayjs(b.getCreated(), 'DD/MM/YYYY'); 

      if (sortDirection === SortByDateOptions.OLDEST) {
        return dateB.isAfter(dateA) ? 1 : -1; 
      } else {
        return dateA.isAfter(dateB) ? 1 : -1;
      }
    });
  }

  const sortByName = (sortDirection: SortByNameOptions): void => {
    planets.value.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (sortDirection === SortByNameOptions.A_TO_Z) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  const parseFilterOption = () => {
    if (!filterCriteria.value) {
      return '?';
    }
    return `?search=${filterCriteria.value}&`;
  }

  const updateQueryParams = (params: QueryParams) => {
    router.push({ query: { ...route.query, ...params } });
  };

  return {
    planets,
    planetsCount,
    page,
    setParamsBasedOnRoute,
    fetch,
    clearFilters,
    setFilter,
    setSort,
    setPage,
  };
}
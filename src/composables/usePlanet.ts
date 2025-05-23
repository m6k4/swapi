import { computed, ref, type Ref } from 'vue';
import  { type PlanetDTO, type SortByDateOptions, type SortByNameOptions, type SortOption,  SortByDateOptionsEnum, SortByNameOptionsEnum } from '@/types/types';
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
      .get(`/planets/${parseFilterOption()}page=${page.value}`)
      .then((response) => {
        const data = response.data;
        planetsCount.value = data.count;
        const results = data.results as PlanetDTO[];

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
  
  const setPage = (newPage: number): void => {
    page.value = newPage;
    updateQueryParams({ page: `${newPage}` });
    fetch();
  }

  const setFilter = (filter: string): void => {
    filterCriteria.value = filter;
    console.log(route.query, filter);
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
    if (sorting.code === SortByDateOptionsEnum.NEWEST || sorting.code === SortByDateOptionsEnum.OLDEST) {
      sortByDate(sorting.code);
    } else if (sorting.code === SortByNameOptionsEnum.A_TO_Z || sorting.code === SortByNameOptionsEnum.Z_TO_A) {
      sortByName(sorting.code);
    }
  }

  const sortByDate = (sortDirection: SortByDateOptions): void => {
    planets.value.sort((a, b) => {
      const dateA = dayjs(a.getCreated(), 'DD/MM/YYYY');
        const dateB = dayjs(b.getCreated(), 'DD/MM/YYYY'); 

      if (sortDirection === SortByDateOptionsEnum.OLDEST) {
        return dateB.isAfter(dateA) ? 1 : -1; 
      } else {
        return dateA.isAfter(dateB) ? 1 : -1;
      }
    });
  }

  const sortByName = (sortDirection: SortByNameOptions): void => {
    planets.value.sort((a, b) => {
      const nameA = a.getName().toLowerCase();
      const nameB = b.getName().toLowerCase();
      if (sortDirection === SortByNameOptionsEnum.A_TO_Z) {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  const parseFilterOption = (): string => {
    if (!filterCriteria.value) {
      return '?';
    }
    return `?search=${filterCriteria.value}&`;
  }

  const updateQueryParams = (params: QueryParams) => {
    router.push({ query: { ...route.query, ...params } });
  };

  return {
    planets: computed(() => planets.value as Planet[]),
    planetsCount: computed(() => planetsCount.value),
    page,
    setParamsBasedOnRoute,
    fetch,
    setFilter,
    setSort,
    setPage,
  };
}
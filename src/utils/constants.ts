import { SortByNameOptionsEnum, SortByDateOptionsEnum, type SortOption } from "@/types/types";

export const planetsSortOptions: SortOption[] =
  [
    { sort: "Newest First", code: SortByDateOptionsEnum.NEWEST },
    { sort: "Oldest First", code: SortByDateOptionsEnum.OLDEST },
    { sort: "Name A-Z", code: SortByNameOptionsEnum.A_TO_Z },
    { sort: "Name Z-A", code: SortByNameOptionsEnum.Z_TO_A },
  ]

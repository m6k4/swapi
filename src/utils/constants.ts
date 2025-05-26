import { SortByNameOptions, SortByDateOptions, type SortOption } from "@/types/types";

export const planetsSortOptions: SortOption[] =
  [
    { sort: "Newest First", code: SortByDateOptions.NEWEST },
    { sort: "Oldest First", code: SortByDateOptions.OLDEST },
    { sort: "Name A-Z", code: SortByNameOptions.A_TO_Z },
    { sort: "Name Z-A", code: SortByNameOptions.Z_TO_A },
  ]

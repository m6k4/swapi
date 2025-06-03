export interface RequestInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlanetDTO[];
}
export interface PlanetDTO {
  name: string;
  population: string;
  rotation_period: string;
  climate: string;
  gravity: string;
  created: string;
  url: string;
}

export enum SortByDateOptions {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export enum SortByNameOptions {
  A_TO_Z = 'a_to_z',
  Z_TO_A = 'z_to_a',
}

export interface SortOption {
  sort: string;
  code: SortByDateOptions | SortByNameOptions;
}

export interface QueryParams{
  page?: string;
  filter?: string;
  sort?: string;
};
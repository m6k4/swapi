export interface PlanetDTO {
  name: string;
  population: string;
  rotation_period: string;
  climate: string;
  gravity: string;
  created: string;
  url: string;
}

export enum SortByDateOptionsEnum {
  NEWEST = 'newest',
  OLDEST = 'oldest',
}

export enum SortByNameOptionsEnum {
  A_TO_Z = 'a_to_z',
  Z_TO_A = 'z_to_a',
}

export type SortByDateOptions = `${SortByDateOptionsEnum}`;
export type SortByNameOptions = `${SortByNameOptionsEnum}`;


export interface SortOption {
  sort: string;
  code: SortByDateOptions | SortByNameOptions;
}

export interface QueryParams{
  page?: string;
  filter?: string;
  sort?: string;
};
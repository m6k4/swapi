import type { PlanetDTO } from "@/types/types";
import dayjs from "dayjs";

export default class Planet {

  constructor(
    private readonly name: string,
    private readonly population: string,
    private readonly rotation_period: string,
    private readonly climate: string,
    private readonly gravity: string,
    private readonly created: string,
    private readonly url: string,
    private readonly imageName: string
  ) {}


  static fromDTO(planetDTO: PlanetDTO): Planet {
    return new Planet(
      planetDTO.name,
      planetDTO.population,
      planetDTO.rotation_period,
      planetDTO.climate,
      planetDTO.gravity,
      planetDTO.created,
      planetDTO.url,
      this.generateImageName(planetDTO.name)
    );
    
  }

  private static generateImageName(name: string) {
    let planetNumber = 1;

    if (name.length <= 6) {
        planetNumber = 2;
    } else if (name.length <= 8) {
        planetNumber = 3;
    } else if (name.length <= 9) {
        planetNumber = 4;
    } 

    return `planet${planetNumber}.png`;
  }

  getName(): string {
    return this.name;
  }

  getPopulation(): string {
    return this.population;
  }

  getRotationPeriod(): string {
    return this.rotation_period;
  }

  getClimate(): string {
    return this.climate;
  }

  getGravity(): string {
    return this.gravity;
  }

  getCreated(): string {
    return dayjs(this.created).format("YYYY-MM-DD HH:mm:ss");
  }

  getUrl(): string {
    return this.url;
  }

  getImageName(): string {
    return this.imageName;
  }

}
import type { PlanetDTO } from "@/types/types";
import dayjs from "dayjs";

  
export default class Planet{
  private constructor(
    readonly name: string,
    readonly population: string,
    readonly rotation_period: string,
    readonly climate: string,
    readonly gravity: string,
    readonly created: string,
    readonly url: string,
    readonly imageName: string
  ) { 
  }

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

  getCreated(): string {
    return dayjs(this.created).format("YYYY-MM-DD HH:mm:ss");
  }

}
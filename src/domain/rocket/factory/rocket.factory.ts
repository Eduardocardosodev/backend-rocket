import { Rocket } from '../entity/rocket';

export default class RocketFactory {
  public static create(name: string, size: number): Rocket {
    return new Rocket(name, size);
  }
}

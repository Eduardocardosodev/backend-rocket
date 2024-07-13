import { Rocket } from '../../../domain/rocket/entity/rocket';

export interface IInitialPosition {
  x: number;
  y: number;
  direction: string;
}

export interface InputCreateLogtDto {
  commands: string;
  initialPosition: IInitialPosition;
  rocket_id: string;
}

export interface OutputCreateLogtDto {
  id: string;
  commands: string;
  initialPosition: IInitialPosition;
  rocket_id: string;
  rocket: Rocket;
}

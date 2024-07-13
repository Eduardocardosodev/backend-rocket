import { Rocket } from '../entity/rocket';
import RocketFactory from './rocket.factory';

describe('rocket factory unit test', () => {
  it('should create a rocket', () => {
    let rocket = RocketFactory.create('B2L3', 1);

    expect(rocket.name).toBe('B2L3');

    expect(rocket.size).toBe(1);
  });
});

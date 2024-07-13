import { Rocket } from '../../rocket/entity/rocket';
import LogFactory from './log.factory';

let initialPosition = {
  x: 1,
  y: 1,
  direction: 'N',
};

describe('log factory unit test', () => {
  it('should create a log', () => {
    const rocket = new Rocket('B2L3', 1);

    let log = LogFactory.create('LRLRLR', initialPosition, rocket.id);

    expect(log.commands).toBe('LRLRLR');

    expect(log.initialPosition.direction).toBe('N');

    expect(log.rocket_id).toBe(rocket.id);
  });
});

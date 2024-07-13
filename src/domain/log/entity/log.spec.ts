import { Log } from './log';

let initialPosition = {
  x: 1,
  y: 1,
  direction: 'N',
};

describe('log unit tests', () => {
  it('should throw error when rocket_id is empty', () => {
    expect(() => {
      let log = new Log('LRLRLR', initialPosition, '');
    }).toThrowError('Log: Rocket_id is required');
  });
});

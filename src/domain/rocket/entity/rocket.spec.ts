import { Rocket } from './rocket';

describe('rocket unit tests', () => {
  it('should throw error when size is empty', () => {
    expect(() => {
      let rocket = new Rocket('Eduardo', null);
    }).toThrowError('Rocket: Size is required');
  });
});

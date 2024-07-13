import RocketFactory from '../../../domain/rocket/factory/rocket.factory';
import RocketRepositoryInterface from '../../../domain/rocket/repository/rocket-repository.interface';
import ListRocketUseCase from './list.rocket.usecase';

const rocket1 = RocketFactory.create('b2l2', 1);
const rocket2 = RocketFactory.create('b2l3', 2);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([rocket1, rocket2])),
  } as unknown as RocketRepositoryInterface;
};

describe('Unit Test for listing rocket use case', () => {
  it('should list a rocket', async () => {
    const repository = MockRepository();
    const usecase = new ListRocketUseCase(repository);

    const output = await usecase.execute();

    expect(output.length).toBe(2);
    expect(output[0].id).toBe(rocket1.id);

    expect(output[0].name).toBe(rocket1.name);

    expect(output[0].size).toBe(rocket1.size);

    expect(output[1].id).toBe(rocket2.id);
    expect(output[1].name).toBe(rocket2.name);
    expect(output[1].size).toBe(rocket2.size);
  });
});

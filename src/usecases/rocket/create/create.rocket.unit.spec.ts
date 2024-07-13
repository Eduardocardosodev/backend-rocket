import CreateRocketUseCase from './create.rocket.usecase';

const input = {
  name: 'B2L2',
  size: 1,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn(),
    delete: jest.fn(),
  };
};
describe('Unit Test create rocket use case', () => {
  it('should create a rocket', async () => {
    const rocketRepository = MockRepository();
    const rocketCreateUseCase = new CreateRocketUseCase(rocketRepository);

    const output = await rocketCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      size: input.size,
    });
  });

  it('should thrown an error when name is missing', async () => {
    const rocketRepository = MockRepository();
    const rocketCreateUseCase = new CreateRocketUseCase(rocketRepository);

    input.name = '';

    await expect(rocketCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    );
  });

  it('should thrown an error when size is missing', async () => {
    const rocketRepository = MockRepository();
    const rocketCreateUseCase = new CreateRocketUseCase(rocketRepository);

    input.size = null;

    await expect(rocketCreateUseCase.execute(input)).rejects.toThrow(
      'Size is required'
    );
  });
});

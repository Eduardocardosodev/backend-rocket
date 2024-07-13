import CreateLogUseCase from './create.log.usecase';

let initialPosition = {
  x: 1,
  y: 1,
  direction: 'N',
};

const input = {
  commands: 'LRLRLRLR',
  initialPosition,
  rocket_id: '123123',
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };
};
describe('Unit Test create log use case', () => {
  it('should create a log', async () => {
    const logRepository = MockRepository();
    const logCreateUseCase = new CreateLogUseCase(logRepository);

    const output = await logCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      commands: input.commands,
      initialPosition: input.initialPosition,
      rocket_id: expect.any(String),
    });
  });

  it('should thrown an error when commands is missing', async () => {
    const logRepository = MockRepository();
    const logCreateUseCase = new CreateLogUseCase(logRepository);

    input.commands = '';

    await expect(logCreateUseCase.execute(input)).rejects.toThrow(
      'Commands is required'
    );
  });

  it('should thrown an error when initialPosition is missing', async () => {
    const logRepository = MockRepository();
    const logCreateUseCase = new CreateLogUseCase(logRepository);

    input.initialPosition = null;

    await expect(logCreateUseCase.execute(input)).rejects.toThrow(
      'InitialPosition is required'
    );
  });
});

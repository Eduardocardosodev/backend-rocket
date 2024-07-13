import DeleteRocketUseCase from './delete.rocket.usecase';

const input = {
  id: '12313',
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn().mockResolvedValue({}),
    update: jest.fn(),
    create: jest.fn(),
  };
};
describe('Unit Test delete rocket use case', () => {
  it('should delete a rocket', async () => {
    const rocketRepository = MockRepository();
    const rocketdeleteUseCase = new DeleteRocketUseCase(rocketRepository);

    const output = await rocketdeleteUseCase.execute(input);

    expect(rocketRepository.delete).toHaveBeenCalledWith(input.id);
    expect(output).toEqual({
      message: 'rocket successfully deleted',
    });
  });

  it('should thrown an error when rocket is not delete', async () => {
    const rocketRepository = MockRepository();
    const rocketdeleteUseCase = new DeleteRocketUseCase(rocketRepository);

    input.id = '';

    await expect(rocketdeleteUseCase.execute(input)).rejects.toThrow(
      'Id is required'
    );
  });
});

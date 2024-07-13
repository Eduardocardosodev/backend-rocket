import RocketRepositoryInterface from '../../../domain/rocket/repository/rocket-repository.interface';
import { InputDeleteRocketDto } from './delete.rocket.dto';

export default class DeleteRocketUseCase {
  private rocketRepository: RocketRepositoryInterface;

  constructor(rocketRepository: RocketRepositoryInterface) {
    this.rocketRepository = rocketRepository;
  }

  async execute(input: InputDeleteRocketDto): Promise<any> {
    if (!input.id) {
      throw new Error('Id is required');
    }
    const rocketDelete = await this.rocketRepository.delete(input.id);

    return { message: 'rocket successfully deleted' };
  }
}

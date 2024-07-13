import { Rocket } from '../../../domain/rocket/entity/rocket';
import RocketRepositoryInterface from '../../../domain/rocket/repository/rocket-repository.interface';
import { OutputListRocketDto } from './list.rocket.dto';

export default class ListRocketUseCase {
  private rocketRepository: RocketRepositoryInterface;

  constructor(rocketRepository: RocketRepositoryInterface) {
    this.rocketRepository = rocketRepository;
  }

  async execute(): Promise<OutputListRocketDto[]> {
    const rockets = await this.rocketRepository.findAll();
    if (rockets.length === 0) {
      throw new Error('rocket not found');
    }
    return OutputMapper.toOutput(rockets);
  }
}
class OutputMapper {
  static toOutput(rockets: Rocket[]): any {
    const rocket = rockets.map((rocket) => ({
      id: rocket.id,
      name: rocket.name,
      size: rocket.size,
    }));

    return rocket;
  }
}

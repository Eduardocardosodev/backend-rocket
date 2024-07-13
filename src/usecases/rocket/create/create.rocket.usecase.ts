import RocketFactory from '../../../domain/rocket/factory/rocket.factory';
import RocketRepositoryInterface from '../../../domain/rocket/repository/rocket-repository.interface';
import {
  InputCreateRocketDto,
  OutputCreateRocketDto,
} from './create.rocket.dto';

export default class CreateRocketUseCase {
  private rocketRepository: RocketRepositoryInterface;

  constructor(rocketRepository: RocketRepositoryInterface) {
    this.rocketRepository = rocketRepository;
  }

  async execute(input: InputCreateRocketDto): Promise<OutputCreateRocketDto> {
    const rocket = RocketFactory.create(input.name, input.size);

    const rocketFind = await this.rocketRepository.findAll();

    if (rocketFind.length === 1) {
      console.log(
        `O Rocket ${rocketFind[0].name} ainda não finalizou o mapeamento`
      );
      throw new Error(
        `O Rocket ${rocketFind[0].name} ainda não finalizou o mapeamento`
      );
    }
    await this.rocketRepository.create(rocket);

    return {
      id: rocket.id,
      name: rocket.name,
      size: rocket.size,
    };
  }
}

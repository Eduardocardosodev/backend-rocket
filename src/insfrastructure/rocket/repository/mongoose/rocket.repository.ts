import { Rocket } from '../../../../domain/rocket/entity/rocket';
import RocketRepositoryInterface from '../../../../domain/rocket/repository/rocket-repository.interface';
import { OutputListRocketDto } from '../../../../usecases/rocket/list/list.rocket.dto';
import { RocketModel } from './rocket.model';

export default class RocketRepository implements RocketRepositoryInterface {
  async delete(id: string): Promise<void> {
    const rocketDeleted = await RocketModel.findByIdAndDelete(id);
    if (!rocketDeleted) {
      throw new Error('rocket not found');
    }
  }
  async create(entity: Rocket): Promise<void> {
    await RocketModel.create({
      _id: entity.id,
      name: entity.name,
      size: entity.size,
    });
  }

  async find(id: string): Promise<any | null> {
    const rocketModel = await RocketModel.findById(id);

    if (!rocketModel) {
      throw new Error('rocket not found');
    }

    return {
      id: rocketModel._id,
      name: rocketModel.name,
      size: rocketModel.size,
    };
  }

  async findAll(): Promise<OutputListRocketDto[]> {
    const rocketModels = await RocketModel.find();

    let rocketsArray: any[] = [];
    const rocket = rocketModels.map((rocketModels) => {
      let rockets = {
        id: rocketModels._id.toString(),
        name: rocketModels.name,
        size: rocketModels.size,
      };
      rocketsArray.push(rockets);
    });

    return rocketsArray;
  }
}

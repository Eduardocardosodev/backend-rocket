import { Log } from '../../../../domain/log/entity/log';
import LogRepositoryInterface from '../../../../domain/log/repository/log-repository.interface';
import { LogModel } from './log.model';

export default class LogRepository implements LogRepositoryInterface {
  async delete(id: string): Promise<void> {
    const logDeleted = await LogModel.findByIdAndDelete(id);
    if (!logDeleted) {
      throw new Error('log not found');
    }
  }
  async create(entity: any): Promise<void> {
    console.log('entity', entity);
    await LogModel.create({
      _id: entity._id,
      commands: entity._commands,
      initialPosition: entity._initialPosition,
      rocket_id: entity._rocket_id,
    });
  }

  async find(id: string): Promise<any | null> {
    const logModel = await LogModel.findById(id);

    if (!logModel) {
      throw new Error('log not found');
    }

    return {
      id: logModel._id,
      commands: logModel.commands,
      initialPosition: logModel.initialPosition,
      rocket_id: logModel.rocket_id,
    };
  }

  async findAll(): Promise<any[]> {
    return await LogModel.find();
  }
}

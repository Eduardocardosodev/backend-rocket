import LogFactory from '../../../domain/log/factory/log.factory';
import LogRepositoryInterface from '../../../domain/log/repository/log-repository.interface';
import { InputCreateLogtDto, OutputCreateLogtDto } from './create.log.dto';

export default class CreateLogUseCase {
  private logRepository: LogRepositoryInterface;

  constructor(logRepository: LogRepositoryInterface) {
    this.logRepository = logRepository;
  }

  async execute(input: InputCreateLogtDto): Promise<OutputCreateLogtDto> {
    const log = LogFactory.create(
      input.commands,
      input.initialPosition,
      input.rocket_id
    );

    console.log(log);

    await this.logRepository.create(log);

    return {
      id: log.id,
      commands: log.commands,
      initialPosition: log.initialPosition,
      rocket_id: log.rocket_id,
      rocket: log.rocket,
    };
  }
}

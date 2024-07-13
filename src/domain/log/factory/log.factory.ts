import { IInitialPosition } from '../../../usecases/log/create/create.log.dto';
import { Log } from '../entity/log';

export default class LogFactory {
  public static create(
    commands: string,
    initialPosition: IInitialPosition,
    rocket_id: string
  ): Log {
    return new Log(commands, initialPosition, rocket_id);
  }
}

import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.errors';
import { Rocket } from '../../rocket/entity/rocket';
import { v4 as uuid } from 'uuid';
import LogValidatorFactory from '../factory/log.validator.factory';
import { IInitialPosition } from '../../../usecases/log/create/create.log.dto';

export class Log extends Entity {
  private _commands: string = '';
  private _initialPosition: IInitialPosition = {
    x: 0,
    y: 0,
    direction: '',
  };
  private _rocket_id: string = '';
  private _rocket: Rocket;

  constructor(
    commands: string,
    initialPosition: IInitialPosition,
    rocket_id: string
  ) {
    super();
    this._id = uuid();
    this._commands = commands;
    this._initialPosition = initialPosition;
    this._rocket_id = rocket_id;

    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get commands(): string {
    return this._commands;
  }

  get initialPosition(): IInitialPosition {
    return this._initialPosition;
  }

  get rocket_id(): string {
    return this._rocket_id;
  }

  get rocket(): Rocket {
    return this._rocket;
  }

  validate() {
    LogValidatorFactory.create().validate(this);
  }

  set Rocket(rocket: Rocket) {
    this._rocket = rocket;
  }
}

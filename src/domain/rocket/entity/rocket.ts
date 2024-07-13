import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.errors';
import RocketValidatorFactory from '../factory/rocket.validator.factory';
import { v4 as uuid } from 'uuid';

export class Rocket extends Entity {
  private _name: string = '';
  private _size: number = 0;

  constructor(name: string, size: number) {
    super();
    this._id = uuid();
    this._name = name;
    this._size = size;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get size(): number {
    return this._size;
  }

  validate() {
    RocketValidatorFactory.create().validate(this);
  }
}

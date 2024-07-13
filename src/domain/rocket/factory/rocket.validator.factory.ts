import ValidatorInterface from '../../@shared/validator/validator.interface';
import { Rocket } from '../entity/rocket';
import RocketYupValidator from '../validator/rocket.yup.validator';

export default class RocketValidatorFactory {
  static create(): ValidatorInterface<Rocket> {
    return new RocketYupValidator();
  }
}

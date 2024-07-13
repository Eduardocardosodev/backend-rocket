import ValidatorInterface from '../../@shared/validator/validator.interface';
import { Log } from '../entity/log';
import LogYupValidator from '../validator/log.yup.validator';

export default class LogValidatorFactory {
  static create(): ValidatorInterface<Log> {
    return new LogYupValidator();
  }
}

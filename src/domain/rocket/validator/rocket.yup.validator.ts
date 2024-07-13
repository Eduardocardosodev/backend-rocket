import ValidatorInterface from '../../@shared/validator/validator.interface';
import { Rocket } from '../entity/rocket';
import * as yup from 'yup';

export default class RocketYupValidator implements ValidatorInterface<Rocket> {
  validate(entity: Rocket): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          size: yup.number().required('Size is required'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            size: entity.size,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((erro) => {
        entity.notification.addError({
          context: 'Rocket',
          message: erro,
        });
      });
    }
  }
}

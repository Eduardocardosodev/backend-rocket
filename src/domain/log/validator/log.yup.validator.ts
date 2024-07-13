import * as yup from 'yup';
import { Log } from '../entity/log';
import ValidatorInterface from '../../@shared/validator/validator.interface';

export default class LogYupValidator implements ValidatorInterface<Log> {
  validate(entity: Log): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          commands: yup.string().required('Commands is required'),
          initialPosition: yup
            .object()
            .shape({
              x: yup.number().required('X is required'),
              y: yup.number().required('Y is required'),
              direction: yup.string().required('Direction is required'),
            })
            .required('InitialPosition is required'),
          rocket_id: yup.string().required('Rocket_id is required'),
        })
        .validateSync(
          {
            id: entity.id,
            commands: entity.commands,
            initialPosition: entity.initialPosition,
            rocket_id: entity.rocket_id,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((erro) => {
        entity.notification.addError({
          context: 'Log',
          message: erro,
        });
      });
    }
  }
}

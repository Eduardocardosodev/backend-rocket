import RepositoryInterface from '../../@shared/repository/repository-interface';
import { Log } from '../entity/log';

export default interface LogRepositoryInterface
  extends RepositoryInterface<Log | any> {}

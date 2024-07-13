import RepositoryInterface from '../../@shared/repository/repository-interface';
import { Rocket } from '../entity/rocket';

export default interface RocketRepositoryInterface
  extends RepositoryInterface<Rocket | any> {}

import { Nullable } from 'app/types/Nullable';
import { Moment } from 'moment';

export interface MethodistMainFilterViewModel {
  title: string;
  // TODO: удивительно конечно
  level: string;
  createdAt: Nullable<Moment>;
}

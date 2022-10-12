import { Nullable } from 'app/types/Nullable';
import { Moment } from 'moment';

export interface MethodistMainFilterViewModel {
  title: string;
  level: string;
  createdAt: Nullable<Moment>;
}

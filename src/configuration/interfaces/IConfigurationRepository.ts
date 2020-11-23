import { Observable } from 'rxjs';
import { IConfigurationModel } from './IConfigurationModel';

export interface IConfigurationRepository {
  getConfigById(id: string): Observable<IConfigurationModel>;
}

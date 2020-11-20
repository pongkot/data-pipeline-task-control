import { Observable } from 'rxjs';
import { ICostRateModel } from './ICostRateModel';

export interface ICostRateRepository {
  listCostRates(): Observable<ICostRateModel>; // TODO replace to model
}

import { Observable } from 'rxjs';
import { ICostRateModel } from './ICostRateModel';

export interface ICostRateService {
  getActiveCostRates(): Observable<ICostRateModel[]>;
}

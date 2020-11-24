import { Observable } from 'rxjs';
import { ICostRateModel } from './ICostRateModel';

export interface ICostRateService {
  getCostRateByAdsAccountRecordId(id: string): Observable<ICostRateModel>;
}

import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateModel } from '../FacebookInsightLvAccountByDateModel';

export interface ITaskService {
  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountByDateModel>;
}

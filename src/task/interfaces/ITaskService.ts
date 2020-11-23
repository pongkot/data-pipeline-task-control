import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateModel } from '../../facebook-insight/models';

export interface ITaskService {
  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountByDateModel>;
}

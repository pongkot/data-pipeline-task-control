import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateTaskModel } from '../../facebook-insight/models';

export interface ITaskService {
  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountByDateTaskModel>;
}

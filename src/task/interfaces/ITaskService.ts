import { Observable } from 'rxjs';
import { FacebookInsightLvAccountTask } from '../model';

export interface ITaskService {
  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountTask>;
}

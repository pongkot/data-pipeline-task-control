import { Observable } from 'rxjs';
import {
  FacebookInsightLvAccountTask,
  FacebookInsightLvCampaignTask,
} from '../model';

export interface ITaskService {
  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountTask>;

  getFacebookInsightLvCampaignByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvCampaignTask>;
}

import { Observable } from 'rxjs';
import {
  FacebookInsightLvAccountTask,
  FacebookInsightLvCampaignTask,
} from '../../task/model';

export interface IProducerService {
  sendToFacebookInsightLvAccount(
    content: FacebookInsightLvAccountTask,
  ): Observable<{ message: string }>;

  sentToFacebookInsightLvCampaign(
    content: FacebookInsightLvCampaignTask,
  ): Observable<{ message: string }>;
}

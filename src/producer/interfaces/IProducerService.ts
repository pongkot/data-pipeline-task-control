import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateModel } from '../../task';

export interface IProducerService {
  sendToFacebookInsight(
    content: FacebookInsightLvAccountByDateModel,
  ): Observable<{ message: string }>;
}

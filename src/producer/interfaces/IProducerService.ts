import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateModel } from '../../facebook-insight/models';

export interface IProducerService {
  sendToFacebookInsight(
    content: FacebookInsightLvAccountByDateModel,
  ): Observable<{ message: string }>;
}

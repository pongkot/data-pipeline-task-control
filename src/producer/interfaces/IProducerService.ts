import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateTaskModel } from '../../facebook-insight/models';

export interface IProducerService {
  sendToFacebookInsight(
    content: FacebookInsightLvAccountByDateTaskModel,
  ): Observable<{ message: string }>;
}

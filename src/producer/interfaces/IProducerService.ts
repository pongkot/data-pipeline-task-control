import { Observable } from 'rxjs';
import { FacebookInsightLvAccountTask } from '../../task/model';

export interface IProducerService {
  sendToFacebookInsightLvAccount(
    content: FacebookInsightLvAccountTask,
  ): Observable<{ message: string }>;
}

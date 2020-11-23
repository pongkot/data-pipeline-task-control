import { Observable } from 'rxjs';

// TODO replace type to model
export interface IProducerService {
  sendToFacebookInsight(content: {
    adsAccount: {
      id: string;
      status: string;
    };
    facebookAccessToken: string;
    timeRange: { since: Date; until: Date };
    costRate: number;
    metadata: { createAt: number };
  }): Observable<{
    adsAccount: {
      id: string;
      status: string;
    };
    facebookAccessToken: string;
    timeRange: { since: Date; until: Date };
    costRate: number;
    metadata: { createAt: number };
  }>;
}

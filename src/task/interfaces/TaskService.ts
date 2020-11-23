import { Observable } from 'rxjs';

export interface TaskService {
  getFacebookInsightLvAccountByDate(
    period: Date,
  ): Observable<{
    adsAccountId: string;
    facebookAccessToken: string;
    timeRange: {
      since: Date;
      until: Date;
    };
    costRate: number;
    metadata: {
      createAt: number;
    };
  }>;
}

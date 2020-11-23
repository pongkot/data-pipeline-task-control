import { Observable } from 'rxjs';

export interface ITaskService {
  getFacebookInsightLvAccountByDate(
    period: Date,
  ): Observable<{
    adsAccount: {
      id: string;
      status: string;
    };
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
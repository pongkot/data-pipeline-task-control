import { Observable } from 'rxjs';

export interface ISchedulerService {
  createFacebookInsightLvAccountTodayTask(): Observable<{ message: string }>;

  createFacebookInsightLvAccountYesterday(): Observable<{ message: string }>;
}

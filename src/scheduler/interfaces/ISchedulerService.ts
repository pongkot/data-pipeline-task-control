export interface ISchedulerService {
  createFacebookInsightLvAccountTodayTask(): void;

  createFacebookInsightLvAccountYesterday(): void;

  createFacebookInsightLvCampaignTodayTask(): void;

  createFacebookInsightLvCampaignYesterdayTask(): void;
}

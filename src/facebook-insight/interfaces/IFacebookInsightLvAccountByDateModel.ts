export interface IFacebookInsightLvAccountByDateModel {
  getAdsAccountId(): string;

  getAdsAccountStatus(): string;

  getFacebookAccessToken(): string;

  getTimeSince(): Date;

  getTimeUntil(): Date;

  getCostRate(): number;

  getMetadata(): {
    createAt: number;
  };
}

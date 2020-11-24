import { IFacebookInsightLvAccountByDateModel } from '../interfaces';

export class FacebookInsightLvAccountByDateTaskModel
  implements IFacebookInsightLvAccountByDateModel {
  private readonly adsAccountId: string;
  private readonly adsAccountStatus: string;
  private readonly token: string;
  private readonly since: Date;
  private readonly until: Date;
  private readonly rate: number;

  constructor(data: {
    adsAccount: {
      id: string;
      status: string;
    };
    facebookAccessToken: string;
    timeRange: { since: Date; until: Date };
    costRate: number;
  }) {
    this.adsAccountId = data.adsAccount.id;
    this.adsAccountStatus = data.adsAccount.status;
    this.token = data.facebookAccessToken;
    this.since = data.timeRange.since;
    this.until = data.timeRange.until;
    this.rate = data.costRate;
  }

  getAdsAccountId(): string {
    return this.adsAccountId;
  }

  getAdsAccountStatus(): string {
    return this.adsAccountStatus;
  }

  getCostRate(): number {
    return this.rate;
  }

  getFacebookAccessToken(): string {
    return this.token;
  }

  getMetadata(): { createAt: number } {
    return { createAt: new Date().getTime() };
  }

  getTimeSince(): Date {
    return this.since;
  }

  getTimeUntil(): Date {
    return this.until;
  }
}

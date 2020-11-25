import { IFacebookInsightTaskModel, ITaskModel } from '../interfaces';

export class FacebookInsightLvCampaignTask
  implements IFacebookInsightTaskModel, ITaskModel {
  private adsAccount: {
    id: string;
    status: string;
    accessToken: string;
  };
  private readonly costRate: number;
  private timeRange: {
    since: Date;
    until: Date;
  };

  constructor(
    adsAccount: { id: string; status: string; accessToken: string },
    costRate = 0,
    timeRange: {
      since: Date;
      until: Date;
    },
  ) {
    this.adsAccount = adsAccount;
    this.costRate = costRate;
    this.timeRange = timeRange;
  }

  getAdsAccountId(): string {
    return this.adsAccount.id;
  }

  getAdsAccountStatus(): string {
    return this.adsAccount.status;
  }

  getCostRate(): number {
    return this.costRate;
  }

  getFacebookAccessToken(): string {
    return this.adsAccount.accessToken;
  }

  getMetadata(): { createAt: number } {
    return { createAt: new Date().getTime() };
  }

  getSince(): Date {
    return this.timeRange.since;
  }

  getUntil(): Date {
    return this.timeRange.until;
  }
}

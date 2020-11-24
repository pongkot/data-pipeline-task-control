export interface IFacebookInsightLvAccountTaskSchema {
  adsAccount: {
    id: string;
    status: string;
  };
  facebookAccessToken: string;
  timeRange: { since: Date; until: Date };
  costRate: number;
  metadata: {
    createAt: number;
  };
}

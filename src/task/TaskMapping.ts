import { Injectable } from '@nestjs/common';
import { FacebookInsightLvAccountByDateTaskModel } from '../facebook-insight/models';

@Injectable()
export class TaskMapping {
  serializeToFacebookInsightLvAccountTask(doc: {
    adsAccount: {
      id: string;
      status: string;
    };
    facebookAccessToken: string;
    timeRange: { since: Date; until: Date };
    costRate: number;
  }): FacebookInsightLvAccountByDateTaskModel {
    return new FacebookInsightLvAccountByDateTaskModel(doc);
  }

  deserializeToFacebookInsightLvAccountTask(
    model: FacebookInsightLvAccountByDateTaskModel,
  ): {
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
  } {
    return {
      adsAccount: {
        id: model.getAdsAccountId(),
        status: model.getAdsAccountStatus(),
      },
      costRate: model.getCostRate(),
      facebookAccessToken: model.getFacebookAccessToken(),
      metadata: model.getMetadata(),
      timeRange: { since: model.getTimeSince(), until: model.getTimeUntil() },
    };
  }
}

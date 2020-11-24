import { Injectable } from '@nestjs/common';
import { FacebookInsightLvAccountByDateTaskModel } from '../facebook-insight/models';
import { IFacebookInsightLvAccountTaskSchema } from './interfaces';

@Injectable()
export class TaskMapping {
  serializeToFacebookInsightLvAccountTask(
    doc: IFacebookInsightLvAccountTaskSchema,
  ): FacebookInsightLvAccountByDateTaskModel {
    return new FacebookInsightLvAccountByDateTaskModel(doc);
  }

  deserializeToFacebookInsightLvAccountTask(
    model: FacebookInsightLvAccountByDateTaskModel,
  ): IFacebookInsightLvAccountTaskSchema {
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

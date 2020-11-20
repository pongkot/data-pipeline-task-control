import { MappingCore } from '../common';
import { ICostRateModel } from './interface';
import { ICostRateSchema } from '../htdocs/schema/mongo/nipa-mail';
import { CostRateModel } from './CostRateModel';

export class CostRateMapping extends MappingCore<
  ICostRateModel,
  ICostRateSchema
> {
  deserialize(model: ICostRateModel): ICostRateSchema {
    return {
      __v: model.getVersion(),
      _id: model.getId(),
      adsAccountId: model.getAdsAccountId(),
      rate: model.getRate(),
      timestamp: model.getTimeStamp(),
    };
  }

  serialize(doc: ICostRateSchema): ICostRateModel {
    return new CostRateModel()
      .setId(doc._id)
      .setAdsAccountId(doc.adsAccountId)
      .setRate(doc.rate)
      .setTimeStamp(doc.timestamp)
      .setVersion(doc.__v);
  }
}

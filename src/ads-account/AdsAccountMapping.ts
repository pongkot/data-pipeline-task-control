import { MappingCore } from '../common';
import { IAdsAccountModel } from './interfaces';
import { IAdsAccountSchema } from '../htdocs/schema/mongo/nipa-mail';
import { Injectable } from '@nestjs/common';
import { AdsAccountModel } from './AdsAccountModel';

@Injectable()
export class AdsAccountMapping extends MappingCore<
  IAdsAccountModel,
  IAdsAccountSchema
> {
  deserialize(model: IAdsAccountModel): IAdsAccountSchema {
    return {
      __v: model.get__V(),
      _id: model.getId(),
      accountId: model.getAccountId(),
      adsAccountId: model.getAdsAccountId(),
      adsAccountName: model.getAdsAccountName(),
      amount: model.getAmount(),
      balance: model.getBalance(),
      budget: model.getBudget(),
      cost: model.getCost(),
      createdAt: model.getCreatedAt(),
      lineToken: model.getLineToken(),
      product: model.getProduct(),
      reason: model.getReason(),
      remain: model.getRemain(),
      report: model.getReport(),
      serviceEndDate: model.getServiceEndDate(),
      specialist: model.getSpecialist(),
      status: model.getStatus(),
      today: model.getToday(),
      updatedAt: model.getUpdatedAt(),
    };
  }

  serialize(doc: IAdsAccountSchema): IAdsAccountModel {
    return new AdsAccountModel()
      .set__V(doc.__v)
      .setId(doc._id)
      .setAccountId(doc.accountId)
      .setAdsAccountId(doc.adsAccountId)
      .setAmount(doc.amount)
      .setBalance(doc.balance)
      .setBudget(doc.budget)
      .setCost(doc.cost)
      .setCreatedAt(doc.createdAt)
      .setLineToken(doc.lineToken)
      .setProduct(doc.product)
      .setReason(doc.reason)
      .setRemain(doc.remain)
      .setReport(doc.report)
      .setServiceEndDate(doc.serviceEndDate)
      .setSpecialist(doc.specialist)
      .setStatus(doc.status)
      .setToday(doc.today)
      .setUpdatedAt(doc.updatedAt);
  }
}

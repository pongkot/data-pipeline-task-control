import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../common/token';
import { map, toArray } from 'rxjs/operators';
import { ICostRateModel, ICostRateService } from './interface';
import { CostRateRepository } from './CostRateRepository';
import { Observable } from 'rxjs';

@Injectable()
export class CostRateService implements ICostRateService {
  constructor(
    @Inject(Repository.COST_RATE)
    private readonly costRateRepository: CostRateRepository,
  ) {}

  getActiveCostRates(): Observable<ICostRateModel[]> {
    return this.costRateRepository.listCostRates().pipe(
      toArray(),
      map((list: ICostRateModel[]) => {
        return list.map((l: ICostRateModel) => {
          const groupByAdsAccountId = list.filter(
            (i: ICostRateModel) => i.getAdsAccountId() === l.getAdsAccountId(),
          );
          return groupByAdsAccountId.length > 1
            ? groupByAdsAccountId[groupByAdsAccountId.length - 1]
            : groupByAdsAccountId[0];
        });
      }),
    );
  }
}

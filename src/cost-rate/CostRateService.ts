import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../common/token';
import { filter, map, mergeAll, mergeMap, toArray } from 'rxjs/operators';
import { ICostRateModel, ICostRateService } from './interface';
import { CostRateRepository } from './CostRateRepository';
import { Observable, of } from 'rxjs';

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

  getCostRateByAdsAccountRecordId(id: string): Observable<ICostRateModel> {
    return of(id).pipe(
      mergeMap((adsAccountRecordId: string) =>
        this.getActiveCostRates().pipe(
          mergeAll(),
          filter(
            (model: ICostRateModel) =>
              model.getAdsAccountId() === adsAccountRecordId, // getAdsAccountId refer to adsAccountId._id
          ),
        ),
      ),
    );
  }
}

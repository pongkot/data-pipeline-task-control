import { Inject, Injectable } from '@nestjs/common';
import { Repository } from '../common/token';
import { ICostRateModel, ICostRateService } from './interface';
import { CostRateRepository } from './CostRateRepository';
import { Observable } from 'rxjs';

@Injectable()
export class CostRateService implements ICostRateService {
  constructor(
    @Inject(Repository.COST_RATE)
    private readonly costRateRepository: CostRateRepository,
  ) {}

  getCostRateByAdsAccountRecordId(id: string): Observable<ICostRateModel> {
    return this.costRateRepository.getLastCostRate(id);
  }
}

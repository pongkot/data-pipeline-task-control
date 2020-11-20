import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { Repository } from '../common/token';
import { CostRateRepository } from './CostRateRepository';
import { Mapping } from '../common/token/Mapping';
import { CostRateMapping } from './CostRateMapping';
import { CostRateService } from './CostRateService';
import { Service } from '../common/token/Service';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: Repository.COST_RATE,
      useClass: CostRateRepository,
    },
    {
      provide: Mapping.COST_RATE,
      useClass: CostRateMapping,
    },
    {
      provide: Service.COST_RATE,
      useClass: CostRateService,
    },
  ],
  exports: [Service.COST_RATE],
})
export class CostRateModule {}

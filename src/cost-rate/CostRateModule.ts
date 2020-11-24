import { Module } from '@nestjs/common';
import { CommonModule } from '../common';
import { Repository } from '../common/token';
import { CostRateRepository } from './CostRateRepository';
import { Mapping } from '../common/token';
import { CostRateMapping } from './CostRateMapping';
import { CostRateService } from './CostRateService';
import { Service } from '../common/token';

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
  exports: [CostRateService],
})
export class CostRateModule {}

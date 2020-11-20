import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { Repository } from '../common/token';
import { CostRateRepository } from './CostRateRepository';
import { Mapping } from '../common/token/Mapping';
import { CostRateMapping } from './CostRateMapping';

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
  ],
  exports: [CostRateRepository],
})
export class CostRateModule {}

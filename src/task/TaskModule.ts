import { Module } from '@nestjs/common';
import { AdsAccountModule } from 'src/ads-account';
import { CostRateModule } from 'src/cost-rate';

@Module({
  imports: [CostRateModule, AdsAccountModule],
})
export class TaskModule {}

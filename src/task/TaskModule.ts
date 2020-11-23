import { Module } from '@nestjs/common';
import { Service } from '../common/token';
import { TaskService } from './TaskService';
import { AdsAccountService } from '../ads-account';
import { CostRateService } from '../cost-rate';

@Module({
  imports: [AdsAccountService, CostRateService],
  providers: [
    {
      provide: Service.TASK,
      useClass: TaskService,
    },
  ],
})
export class TaskModule {}

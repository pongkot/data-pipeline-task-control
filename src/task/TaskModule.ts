import { Module } from '@nestjs/common';
import { Mapping, Service } from '../common/token';
import { TaskService } from './TaskService';
import { AdsAccountModule } from '../ads-account';
import { CommonModule } from '../common/CommonModule';
import { ConfigurationModule } from '../configuration';
import { EncryptionModule } from '../encryption';
import { CostRateModule } from '../cost-rate';
import { TaskMapping } from './TaskMapping';

@Module({
  imports: [
    AdsAccountModule,
    CommonModule,
    ConfigurationModule,
    EncryptionModule,
    CostRateModule,
  ],
  providers: [
    {
      provide: Service.TASK,
      useClass: TaskService,
    },
    {
      provide: Mapping.TASK,
      useClass: TaskMapping,
    },
  ],
  exports: [Service.TASK, Mapping.TASK],
})
export class TaskModule {}

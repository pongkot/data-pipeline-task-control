import { Module } from '@nestjs/common';
import { Service } from '../common/token';
import { TaskService } from './TaskService';
import { AdsAccountModule } from '../ads-account';
import { CommonModule } from '../common/CommonModule';
import { ConfigurationModule } from '../configuration';
import { EncryptionModule } from '../encryption';
import { CostRateModule } from '../cost-rate';

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
  ],
  exports: [Service.TASK],
})
export class TaskModule {}

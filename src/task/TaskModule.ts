import { Module } from '@nestjs/common';
import { Service } from '../common/token';
import { TaskService } from './TaskService';
import { AdsAccountModule } from '../ads-account';
import { CommonModule } from '../common/CommonModule';
import { ConfigurationModule } from '../configuration';

@Module({
  imports: [AdsAccountModule, CommonModule, ConfigurationModule],
  providers: [
    {
      provide: Service.TASK,
      useClass: TaskService,
    },
  ],
})
export class TaskModule {}

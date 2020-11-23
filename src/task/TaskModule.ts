import { Module } from '@nestjs/common';
import { Service } from '../common/token';
import { TaskService } from './TaskService';
import { AdsAccountModule } from '../ads-account';
import { CommonModule } from '../common/CommonModule';

@Module({
  imports: [AdsAccountModule, CommonModule],
  providers: [
    {
      provide: Service.TASK,
      useClass: TaskService,
    },
  ],
})
export class TaskModule {}

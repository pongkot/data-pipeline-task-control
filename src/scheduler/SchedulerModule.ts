import { Module } from '@nestjs/common';
import { TaskModule } from '../task';
import { CommonModule } from '../common';
import { ScheduleModule } from '@nestjs/schedule';
import { Service } from '../common/token';
import { SchedulerService } from './SchedulerService';
import { ProducerModule } from '../producer';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule, ProducerModule, CommonModule],
  providers: [
    {
      provide: Service.SCHEDULER,
      useClass: SchedulerService,
    },
  ],
  exports: [Service.SCHEDULER],
})
export class SchedulerModule {}

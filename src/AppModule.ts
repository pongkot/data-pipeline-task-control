import { Module } from '@nestjs/common';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { SchedulerModule } from './scheduler';

@Module({
  imports: [SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

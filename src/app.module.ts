import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchedulerModule } from './scheduler';

@Module({
  imports: [SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

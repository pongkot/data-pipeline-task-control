import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostRateModule } from './cost-rate';

@Module({
  imports: [CostRateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

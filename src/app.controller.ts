import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CostRateService } from './cost-rate/CostRateService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly costRateService: CostRateService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getCostRate() {
    return this.costRateService.getActiveCostRates();
  }
}

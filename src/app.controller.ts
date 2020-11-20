import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CostRateRepository } from './cost-rate';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly costRateRepository: CostRateRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getCostRate() {
    return this.costRateRepository.listCostRates();
  }
}

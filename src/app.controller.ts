import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CostRateService } from './cost-rate';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

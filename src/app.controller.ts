import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Service } from './common/token';
import { TaskService } from './task';
import { ProducerService } from './producer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Service.TASK)
    private readonly taskService: TaskService,
    @Inject(Service.PRODUCER)
    private readonly producerService: ProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

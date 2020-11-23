import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Service } from './common/token';
import { TaskService } from './task';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(Service.TASK)
    private readonly taskService: TaskService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  test() {
    return this.taskService.getFacebookInsightLvAccountByDate(
      new Date('2020-10-14'),
      new Date('2020-10-14'),
    );
  }
}

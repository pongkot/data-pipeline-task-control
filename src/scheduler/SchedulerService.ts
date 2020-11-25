import { ISchedulerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping, Service } from '../common/token';
import { TaskService } from '../task';
import { AppLogger, config } from '../common';
import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateTaskModel } from '../facebook-insight/models';
import { mergeMap } from 'rxjs/operators';
import { TaskMapping } from '../task/TaskMapping';
import { ProducerService } from '../producer';
import dayjs from 'dayjs';
import { Cron } from '@nestjs/schedule';
import { IScheduler } from '../common/interfaces';

const CronTime: IScheduler = config.scheduler;

@Injectable()
export class SchedulerService implements ISchedulerService {
  constructor(
    @Inject(Service.TASK)
    private readonly taskService: TaskService,
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Mapping.TASK)
    private readonly taskMapping: TaskMapping,
    @Inject(Service.PRODUCER)
    private readonly producerService: ProducerService,
  ) {
    this.logger.setContext('SchedulerService');
  }

  @Cron(CronTime.facebookInsightLvAccountTodayTask)
  createFacebookInsightLvAccountTodayTask(): void {
    this.taskService
      .getFacebookInsightLvAccountByDate(new Date(), new Date())
      .pipe(
        mergeMap((task: FacebookInsightLvAccountByDateTaskModel) =>
          this.producerService.sendToFacebookInsight(task),
        ),
      )
      .subscribe();
  }

  @Cron(CronTime.facebookInsightLvAccountYesterday)
  createFacebookInsightLvAccountYesterday(): void {
    const yesterday: Date = dayjs().add(-1).toDate();
    this.taskService
      .getFacebookInsightLvAccountByDate(yesterday, yesterday)
      .pipe(
        mergeMap((task: FacebookInsightLvAccountByDateTaskModel) =>
          this.producerService.sendToFacebookInsight(task),
        ),
      )
      .subscribe();
  }
}

import { ISchedulerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping, Service } from '../common/token';
import { TaskService } from '../task';
import { AppLogger, config } from '../common';
import { mergeMap } from 'rxjs/operators';
import { TaskMapping } from '../task/TaskMapping';
import { ProducerService } from '../producer';
import dayjs from 'dayjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IScheduler } from '../common/interfaces';
import {
  FacebookInsightLvAccountTask,
  FacebookInsightLvCampaignTask,
} from '../task/model';

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

  // @Cron(CronTime.facebookInsight.lvAccount.today)
  // TODO for test
  @Cron(CronExpression.EVERY_10_SECONDS)
  createFacebookInsightLvAccountTodayTask(): void {
    this.taskService
      .getFacebookInsightLvAccountByDate(new Date(), new Date())
      .pipe(
        mergeMap((task: FacebookInsightLvAccountTask) =>
          this.producerService.sendToFacebookInsightLvAccount(task),
        ),
      )
      .subscribe();
  }

  @Cron(CronTime.facebookInsight.lvAccount.yesterday)
  createFacebookInsightLvAccountYesterday(): void {
    const yesterday: Date = dayjs().add(-1).toDate();
    this.taskService
      .getFacebookInsightLvAccountByDate(yesterday, yesterday)
      .pipe(
        mergeMap((task: FacebookInsightLvAccountTask) =>
          this.producerService.sendToFacebookInsightLvAccount(task),
        ),
      )
      .subscribe();
  }

  @Cron(CronTime.facebookInsight.lvCampaign.today)
  createFacebookInsightLvCampaignTodayTask(): void {
    this.taskService
      .getFacebookInsightLvCampaignByDate(new Date(), new Date())
      .pipe(
        mergeMap((task: FacebookInsightLvCampaignTask) =>
          this.producerService.sentToFacebookInsightLvCampaign(task),
        ),
      )
      .subscribe();
  }

  @Cron(CronTime.facebookInsight.lvCampaign.yesterday)
  createFacebookInsightLvCampaignYesterdayTask(): void {
    const yesterday: Date = dayjs().add(-1).toDate();
    this.taskService
      .getFacebookInsightLvCampaignByDate(yesterday, yesterday)
      .pipe(
        mergeMap((task: FacebookInsightLvCampaignTask) =>
          this.producerService.sentToFacebookInsightLvCampaign(task),
        ),
      )
      .subscribe();
  }
}

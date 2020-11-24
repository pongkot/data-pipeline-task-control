import { ISchedulerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping, Service } from '../common/token';
import { TaskService } from '../task';
import { AppLogger } from '../common';
import { Cron } from '@nestjs/schedule';
import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateTaskModel } from '../facebook-insight/models';
import { mergeMap } from 'rxjs/operators';
import { TaskMapping } from '../task/TaskMapping';
import { ProducerService } from '../producer';
import dayjs from 'dayjs';

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

  @Cron('0 6,12,19,21 * * *')
  createFacebookInsightLvAccountTodayTask(): Observable<{
    message: string;
  }> {
    return this.taskService
      .getFacebookInsightLvAccountByDate(new Date(), new Date())
      .pipe(
        mergeMap((task: FacebookInsightLvAccountByDateTaskModel) =>
          this.producerService.sendToFacebookInsight(task),
        ),
      );
  }

  @Cron('0 6,19 * * *')
  createFacebookInsightLvAccountYesterday(): Observable<{ message: string }> {
    const yesterday: Date = dayjs().add(-1).toDate();
    return this.taskService
      .getFacebookInsightLvAccountByDate(yesterday, yesterday)
      .pipe(
        mergeMap((task: FacebookInsightLvAccountByDateTaskModel) =>
          this.producerService.sendToFacebookInsight(task),
        ),
      );
  }
}

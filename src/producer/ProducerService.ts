import { IProducerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping, Queue } from '../common/token';
import { AppLogger } from '../common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { FacebookInsightLvAccountByDateTaskModel } from '../facebook-insight/models';
import { TaskMapping } from '../task/TaskMapping';
import { tap } from 'rxjs/operators';

@Injectable()
export class ProducerService implements IProducerService {
  constructor(
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Queue.FACEBOOK_INSIGHT)
    private readonly facebookInsightClient: ClientProxy,
    @Inject(Mapping.TASK)
    private readonly taskMapping: TaskMapping,
  ) {
    this.logger.setContext('ProducerService');
  }

  sendToFacebookInsight(
    content: FacebookInsightLvAccountByDateTaskModel,
  ): Observable<{ message: string }> {
    const payload = this.taskMapping.deserializeToFacebookInsightLvAccountTask(
      content,
    );
    return this.facebookInsightClient
      .emit<{ message: string }>('FetchFacebookInsightLvAccount', payload)
      .pipe(
        tap(() => {
          this.logger.log(
            `send FacebookInsightLvAccount task success; adsAccountId: ${content.getAdsAccountId()}`,
          );
        }),
      );
  }
}

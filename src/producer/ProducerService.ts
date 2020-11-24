import { IProducerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping } from '../common/token';
import { AppLogger } from '../common';
import { Queue } from '../common/token/Queue';
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
    // TODO assign type
    const pattern = { cmd: 'FacebookInsightLvAccount' };
    // TODO assign type
    const payload = this.taskMapping.deserializeToFacebookInsightLvAccountTask(
      content,
    );
    return this.facebookInsightClient
      .send<{ message: string }>(pattern, payload)
      .pipe(
        tap(() => {
          this.logger.log(
            `send task success, adsAccountId: ${content.getAdsAccountId()}`,
          );
        }),
      );
  }
}

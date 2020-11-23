import { IProducerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping } from '../common/token';
import { AppLogger } from '../common';
import { Queue } from '../common/token/Queue';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { FacebookInsightLvAccountByDateTaskModel } from '../facebook-insight/models';
import { TaskMapping } from '../task/TaskMapping';

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
    this.logger.log(
      `sendToFacebookInsight: { adsAccountId: ${content.getAdsAccountId()} }`,
    );
    const doc = this.taskMapping.deserializeToFacebookInsightLvAccountTask(
      content,
    );
    this.facebookInsightClient
      .send<FacebookInsightLvAccountByDateTaskModel>(
        { cmd: 'FacebookInsightLvAccount' },
        doc,
      )
      .subscribe();
    return of({ message: 'success' });
  }
}

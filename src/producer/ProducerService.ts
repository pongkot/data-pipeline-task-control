import { IProducerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping, Queue } from '../common/token';
import { AppLogger } from '../common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { TaskMapping } from '../task/TaskMapping';
import { tap } from 'rxjs/operators';
import {
  FacebookInsightLvAccountTask,
  FacebookInsightLvCampaignTask,
} from '../task/model';

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

  sendToFacebookInsightLvAccount(
    content: FacebookInsightLvAccountTask,
  ): Observable<{ message: string }> {
    return this.facebookInsightClient
      .emit<{ message: string }>('FetchFacebookInsightLvAccountTask', content)
      .pipe(
        tap(() => {
          this.logger.log(
            `FacebookInsightLvAccount task emitted; adsAccountId: ${content.getAdsAccountId()}`,
          );
        }),
      );
  }

  sentToFacebookInsightLvCampaign(
    content: FacebookInsightLvCampaignTask,
  ): Observable<{ message: string }> {
    return this.facebookInsightClient
      .emit<{ message: string }>('FetchFacebookInsightLvCampaignTask', content)
      .pipe(
        tap(() => {
          this.logger.log(
            `FacebookInsightLvCampaign task emitted; adsAccountId: ${content.getAdsAccountId()}`,
          );
        }),
      );
  }
}

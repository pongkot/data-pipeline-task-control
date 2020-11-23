import { IProducerService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { FacebookInsightLvAccountByDateModel } from '../task';
import { APP_LOGGER } from '../common/token';
import { AppLogger } from '../common';
import { Queue } from '../common/token/Queue';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProducerService implements IProducerService {
  constructor(
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Queue.FACEBOOK_INSIGHT)
    private readonly facebookInsightClient: ClientProxy,
  ) {
    this.logger.setContext('ProducerService');
  }

  sendToFacebookInsight(
    content: FacebookInsightLvAccountByDateModel,
  ): Observable<{ message: string }> {
    this.logger.log(
      `sendToFacebookInsight: { adsAccountId: ${content.getAdsAccountId()} }`,
    );
    this.facebookInsightClient
      .send<FacebookInsightLvAccountByDateModel>(
        { cmd: 'FacebookInsightLvAccount' },
        content,
      )
      .subscribe();
    return of({ message: 'success' });
  }
}

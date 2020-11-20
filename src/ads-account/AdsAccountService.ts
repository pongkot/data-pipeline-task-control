import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppLogger } from 'src/common';
import { APP_LOGGER, Repository } from 'src/common/token';
import { AdsAccountRepository } from '.';
import { IAdsAccountModel, IAdsAccountService, Product } from './interfaces';

@Injectable()
export class AdsAccountService implements IAdsAccountService {
  constructor(
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Repository.ADS_ACCOUNT)
    private readonly adsAccountRepository: AdsAccountRepository,
  ) {
    this.logger.setContext('AdsAccountService');
  }

  getAdsAccountProductFacebook(): Observable<IAdsAccountModel> {
    return this.adsAccountRepository.getAdsAccountByProduct(Product.FACEBOOK);
  }
}

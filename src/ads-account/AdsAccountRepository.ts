import { Inject, Injectable } from '@nestjs/common';
import { AppLogger, Mongo } from '../common';
import { IAdsAccountSchema } from '../htdocs/schema/mongo/nipa-mail';
import { IAdsAccountModel, IAdsAccountRepository, Product } from './interfaces';
import { from, Observable } from 'rxjs';
import { APP_LOGGER, CONFIGURATION } from '../common/token';
import { IConfig, IDatabaseOption } from '../common/interfaces';
import { map, mergeAll } from 'rxjs/operators';
import { Mapping } from '../common/token/Mapping';
import { AdsAccountMapping } from './AdsAccountMapping';

@Injectable()
export class AdsAccountRepository
  extends Mongo<IAdsAccountSchema>
  implements IAdsAccountRepository {
  constructor(
    @Inject(CONFIGURATION)
    private readonly configuration: IConfig,
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Mapping.ADS_ACCOUNT)
    private readonly adsAccountMapping: AdsAccountMapping,
  ) {
    super();
    const option: IDatabaseOption = this.configuration.database.mongodb
      .nipaMail;
    this.logger.setContext('AdsAccountRepository');
    this.setDatabaseOption(option);
  }

  getAdsAccountByProduct(product: Product): Observable<IAdsAccountModel> {
    const cursor: Promise<IAdsAccountSchema[]> = this.collection(
      'adsaccounts',
    ).find({ product });
    return from(cursor).pipe(
      mergeAll(),
      map((doc: IAdsAccountSchema) => this.adsAccountMapping.serialize(doc)),
    );
  }
}

import { ICostRateModel, ICostRateRepository } from './interface';
import { AppLogger, Mongo } from '../common';
import { ICostRateSchema } from '../htdocs/schema/mongo/nipa-mail';
import { from, Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIGURATION, LOGGER } from '../common/token';
import { IConfig, IDatabaseOption } from '../common/interfaces';
import { map, mergeAll } from 'rxjs/operators';
import { Mapping } from '../common/token/Mapping';
import { CostRateMapping } from './CostRateMapping';

@Injectable()
export class CostRateRepository
  extends Mongo<ICostRateSchema>
  implements ICostRateRepository {
  constructor(
    @Inject(LOGGER)
    private readonly logger: AppLogger,
    @Inject(CONFIGURATION)
    private readonly configuration: IConfig,
    @Inject(Mapping.COST_RATE)
    private readonly costRateMapping: CostRateMapping,
  ) {
    super();
    this.logger.setContext('CostRateRepository');
    const option: IDatabaseOption = this.configuration.database.mongodb
      .nipaMail;
    this.setDatabaseOption(option);
  }

  listCostRates(): Observable<ICostRateModel> {
    const cursor: Promise<ICostRateSchema[]> = this.collection(
      'costrates',
    ).find({});
    return from(cursor).pipe(
      mergeAll(),
      map((doc: ICostRateSchema) => this.costRateMapping.serialize(doc)),
    );
  }
}

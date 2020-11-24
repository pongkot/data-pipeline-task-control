import { AppLogger, Mongo } from '../common';
import { IConfigurationRepository } from './interfaces';
import { IConfigurationsSchema } from '../htdocs/schema/mongo/nipa-mail';
import { IConfig, IDatabaseOption } from '../common/interfaces';
import { from, Observable } from 'rxjs';
import { IConfigurationModel } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { APP_LOGGER, CONFIGURATION, Mapping } from '../common/token';
import { ConfigurationMapping } from './ConfigurationMapping';

@Injectable()
export class ConfigurationRepository
  extends Mongo<IConfigurationsSchema>
  implements IConfigurationRepository {
  constructor(
    @Inject(CONFIGURATION)
    private readonly configuration: IConfig,
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Mapping.CONFIGURATION)
    private readonly configurationMapping: ConfigurationMapping,
  ) {
    super();
    this.logger.setContext('ConfigurationRepository');
    const option: IDatabaseOption = this.configuration.database.mongodb
      .nipaMail;
    this.setDatabaseOption(option);
  }

  getConfigById(id: string): Observable<IConfigurationModel> {
    const query = {
      _id: id,
    };
    const cursor: Promise<IConfigurationsSchema> = this.collection(
      'configurations',
    ).findOne(query);
    return from(cursor).pipe(
      map((doc: IConfigurationsSchema) =>
        this.configurationMapping.serialize(doc),
      ),
    );
  }
}

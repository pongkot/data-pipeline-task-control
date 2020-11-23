import { Injectable } from '@nestjs/common';
import { IConfigurationModel } from './interfaces/IConfigurationModel';
import { IConfigurationsSchema } from '../htdocs/schema/mongo/nipa-mail';
import { ConfigurationModel } from './ConfigurationModel';
import { MappingCore } from '../common';

@Injectable()
export class ConfigurationMapping extends MappingCore<
  IConfigurationModel,
  IConfigurationsSchema
> {
  deserialize(model: IConfigurationModel): IConfigurationsSchema {
    return {
      _id: model.getId(),
      value: model.getValue(),
    };
  }

  serialize(doc: IConfigurationsSchema): IConfigurationModel {
    const model: ConfigurationModel = new ConfigurationModel();
    model.setId(doc._id);
    model.setValue(doc.value);
    return model;
  }
}

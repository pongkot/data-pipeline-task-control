import { IDatabaseOption } from './IDatabaseOption';

export interface IDatabase {
  mongodb: {
    dataPipeline: IDatabaseOption;
    nipaMail: IDatabaseOption;
  };
}

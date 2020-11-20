import { IApplication } from './IApplication';
import { IDatabase } from './IDatabase';
import { IRabbitMQ } from './IRabbitMQ';

export interface IConfig {
  rabbitmq: IRabbitMQ;
  database: IDatabase;
  application: IApplication;
}

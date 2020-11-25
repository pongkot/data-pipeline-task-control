import { IApplication } from './IApplication';
import { IDatabase } from './IDatabase';
import { IRabbitMQ } from './IRabbitMQ';
import { IScheduler } from './IScheduler';

export interface IConfig {
  rabbitmq: IRabbitMQ;
  database: IDatabase;
  application: IApplication;
  scheduler: IScheduler;
}

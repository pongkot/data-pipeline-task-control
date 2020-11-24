import * as _ from 'lodash';
import { IConfig } from './interfaces';
import { Helper } from './Helper';

const ENV: NodeJS.ProcessEnv = process.env;

export const config: IConfig = {
  application: {
    port: _.toNumber(_.get(ENV, 'PORT', 3000)),
    secret: _.get(ENV, 'SECRET', 'secret'),
  },
  rabbitmq: {
    urls: Helper.getArrayString(
      _.get(ENV, 'DATA_PIPELINE_RMQ', 'amqp://localhost'),
    ),
  },
  database: {
    mongodb: {
      // TODO review it
      dataPipeline: {
        host: _.get(ENV, 'MONGO_DATA_PIPELINE_HOST', 'localhost'),
        user: _.get(ENV, 'MONGO_DATA_PIPELINE_USER', ''),
        password: _.get(ENV, 'MONGO_DATA_PIPELINE_PASS', ''),
        port: _.toNumber(_.get(ENV, 'MONGO_DATA_PIPELINE_PORT', 27017)),
        database: _.get(ENV, 'MONGO_DATA_PIPELINE_DB_NAME', 'DataPipeline'),
      },
      nipaMail: {
        host: _.get(ENV, 'MONGO_NIPA_MAIL_HOST', 'localhost'),
        user: _.get(ENV, 'MONGO_NIPA_MAIL_USER', ''),
        password: _.get(ENV, 'MONGO_NIPA_MAIL_PASS', ''),
        port: _.toNumber(_.get(ENV, 'MONGO_NIPA_MAIL_PORT', 27017)),
        database: _.get(ENV, 'MONGO_NIPA_MAIL_NAME', 'NipaMail'),
      },
    },
  },
};

import { Module } from '@nestjs/common';
import { ProducerService } from './ProducerService';
import { Service } from '../common/token';
import { CommonModule } from '../common/CommonModule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Queue } from '../common/token/Queue';
import { TaskModule } from '../task';

@Module({
  imports: [
    CommonModule,
    TaskModule,
    ClientsModule.register([
      {
        name: Queue.FACEBOOK_INSIGHT,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost'],
          queue: Queue.FACEBOOK_INSIGHT,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [
    {
      provide: Service.PRODUCER,
      useClass: ProducerService,
    },
  ],
  exports: [Service.PRODUCER],
})
export class ProducerModule {}

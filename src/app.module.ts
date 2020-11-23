import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TaskModule,
    ClientsModule.register([
      {
        name: 'FacebookInsightTask',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost'],
          queue: 'FacebookInsightTask',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

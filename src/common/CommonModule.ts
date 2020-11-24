import { Module } from '@nestjs/common';
import { CONFIGURATION, APP_LOGGER } from './token';
import { config } from './config';
import { AppLogger } from './AppLogger';

@Module({
  providers: [
    {
      provide: APP_LOGGER,
      useClass: AppLogger,
    },
    {
      provide: CONFIGURATION,
      useValue: config,
    },
  ],
  exports: [APP_LOGGER, CONFIGURATION],
})
export class CommonModule {}

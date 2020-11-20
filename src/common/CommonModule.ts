import { Module } from '@nestjs/common';
import { CONFIGURATION, LOGGER } from './token';
import { config } from './config';
import { AppLogger } from './AppLogger';

@Module({
  providers: [
    {
      provide: LOGGER,
      useClass: AppLogger,
    },
    {
      provide: CONFIGURATION,
      useValue: config,
    },
  ],
  exports: [LOGGER, CONFIGURATION],
})
export class CommonModule {}

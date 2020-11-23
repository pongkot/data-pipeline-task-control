import { Module } from '@nestjs/common';
import { Mapping, Repository } from '../common/token';
import { ConfigurationMapping } from './ConfigurationMapping';
import { CommonModule } from '../common/CommonModule';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: Repository.CONFIGURATION,
      useClass: ConfigurationModule,
    },
    {
      provide: Mapping.CONFIGURATION,
      useClass: ConfigurationMapping,
    },
  ],
  exports: [Repository.CONFIGURATION],
})
export class ConfigurationModule {}

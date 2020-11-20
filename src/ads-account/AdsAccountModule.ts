import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { Mapping } from '../common/token/Mapping';
import { AdsAccountMapping } from './AdsAccountMapping';
import { Repository } from '../common/token';
import { AdsAccountRepository } from './AdsAccountRepository';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: Mapping.ADS_ACCOUNT,
      useClass: AdsAccountMapping,
    },
    {
      provide: Repository.ADS_ACCOUNT,
      useClass: AdsAccountRepository,
    },
  ],
})
export class AdsAccountModule {}

import { Module } from '@nestjs/common';
import { CommonModule } from '../common/CommonModule';
import { Mapping } from '../common/token/Mapping';
import { AdsAccountMapping } from './AdsAccountMapping';
import { Repository, Service } from '../common/token';
import { AdsAccountRepository } from './AdsAccountRepository';
import { AdsAccountService } from './AdsAccountService';

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
    {
      provide: Service.ADS_ACCOUNT,
      useClass: AdsAccountService,
    },
  ],
  exports: [Service.ADS_ACCOUNT],
})
export class AdsAccountModule {}

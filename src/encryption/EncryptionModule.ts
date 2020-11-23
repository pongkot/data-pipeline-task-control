import { Module } from '@nestjs/common';
import { Service } from '../common/token';
import { EncryptionService } from './EncryptionService';
import { CommonModule } from '../common/CommonModule';

@Module({
  imports: [CommonModule],
  providers: [
    {
      provide: Service.ENCRYPTION,
      useClass: EncryptionService,
    },
  ],
  exports: [Service.ENCRYPTION],
})
export class EncryptionModule {}

import { IEncryptionService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIGURATION } from '../common/token';
import { IConfig } from '../common/interfaces';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService implements IEncryptionService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly secret: string;

  constructor(
    @Inject(CONFIGURATION)
    private readonly configuration: IConfig,
  ) {
    this.secret = this.configuration.application.secret;
  }

  decrypt(cipher: string): string {
    const algorithm = this.getAlgorithm();
    const secretKey = this.getSecret();
    const content = cipher.split('.');
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(content[0], 'hex'),
    );
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content[1], 'hex')),
      decipher.final(),
    ]);
    return decrypted.toString();
  }

  encrypt(plainText: string): string {
    const algorithm = this.getAlgorithm();
    const secretKey = this.getSecret();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);
    return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
  }

  private getSecret(): string {
    return this.secret;
  }

  private getAlgorithm(): string {
    return this.algorithm;
  }
}

import { IEncryptionService } from './interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { CONFIGURATION } from '../common/token';
import { IConfig } from '../common/interfaces';
import {
  Cipher,
  createCipheriv,
  createDecipheriv,
  Decipher,
  randomBytes,
} from 'crypto';

@Injectable()
export class EncryptionService implements IEncryptionService {
  private readonly algorithm = 'aes-256-ctr';
  private readonly iv = randomBytes(16);
  private readonly secret: string;

  constructor(
    @Inject(CONFIGURATION)
    private readonly configuration: IConfig,
  ) {
    this.secret = this.configuration.application.secret;
  }

  decrypt(cipherText: string): string {
    const cipher: Cipher = createCipheriv(
      this.getAlgorithm(),
      this.getSecret(),
      this.getIv(),
    );
    return Buffer.concat([cipher.update(cipherText), cipher.final()]).toString(
      'hex',
    );
  }

  encrypt(plainText: string): string {
    const decipher: Decipher = createDecipheriv(
      this.getAlgorithm(),
      this.getSecret(),
      Buffer.from(this.getIv().toString(), 'hex'),
    );

    return Buffer.concat([
      decipher.update(Buffer.from(plainText, 'hex')),
      decipher.final(),
    ]).toString();
  }

  private getSecret(): string {
    return this.secret;
  }

  private getAlgorithm(): string {
    return this.algorithm;
  }

  private getIv(): Buffer {
    return this.iv;
  }
}

export interface IEncryptionService {
  decrypt(cipherText: string): string;

  encrypt(plainText: string): string;
}

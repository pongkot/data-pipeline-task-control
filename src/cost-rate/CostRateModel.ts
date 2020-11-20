import { ICostRateModel } from './interface';

export class CostRateModel implements ICostRateModel {
  private _id: any;
  private adsAccountId: string; // refer to NipaMail.adsaccounts._id
  private rate: number;
  private timestamp: string;
  private version: number;

  getId(): string {
    return this._id;
  }

  setId(_id: string): this {
    this._id = _id;
    return this;
  }

  getAdsAccountId(): string {
    return this.adsAccountId;
  }

  getRate(): number {
    return this.rate;
  }

  getTimeStamp(): string {
    return this.timestamp;
  }

  getVersion(): number {
    return this.version;
  }

  setAdsAccountId(id: string): this {
    this.adsAccountId = id;
    return this;
  }

  setRate(rate: number): this {
    this.rate = rate;
    return this;
  }

  setTimeStamp(date: string): this {
    this.timestamp = date;
    return this;
  }

  setVersion(version: number): this {
    this.version = version;
    return this;
  }
}

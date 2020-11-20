export interface ICostRateModel {
  setId(_id: string): this;

  setAdsAccountId(id: string): this; // refer to adsAccountId._id

  setRate(rate: number): this;

  setVersion(version: number): this;

  setTimeStamp(date: string): this;

  getId(): string;

  getAdsAccountId(): string;

  getRate(): number;

  getVersion(): number;

  getTimeStamp(): string;
}

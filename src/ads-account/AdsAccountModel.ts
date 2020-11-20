import { IAdsAccountModel } from './interfaces';

export class AdsAccountModel implements IAdsAccountModel {
  private _id?: string;
  private accountId: string;
  private balance: number;
  private adsAccountName: string;
  private adsAccountId: string;
  private product: 'facebook' | 'search' | 'gdn' | 'youtube';
  private specialist: string;
  private status: 'active' | 'hold' | 'disable' | 'stop';
  private createdAt: number;
  private updatedAt: number;
  private __v: number;
  private cost: number;
  private amount: number;
  private budget: number;
  private report: Array<{ name: string; url: string }>;
  private lineToken: Array<{
    name: string;
    type: 'daily' | 'weekly' | 'monthly';
    time: number;
    token: string;
  }>;
  private remain: number;
  private today: number;
  private serviceEndDate: string;
  private reason: string;

  getAccountId(): string {
    return this.accountId;
  }

  getAdsAccountId(): string {
    return this.adsAccountId;
  }

  getAdsAccountName(): string {
    return this.adsAccountName;
  }

  getAmount(): number {
    return this.amount;
  }

  getBalance(): number {
    return this.balance;
  }

  getBudget(): number {
    return this.budget;
  }

  getCost(): number {
    return this.cost;
  }

  getCreatedAt(): number {
    return this.createdAt;
  }

  getLineToken(): Array<{
    name: string;
    type: 'daily' | 'weekly' | 'monthly';
    time: number;
    token: string;
  }> {
    return this.lineToken;
  }

  getProduct(): 'facebook' | 'search' | 'gdn' | 'youtube' {
    return this.product;
  }

  getReason(): string {
    return this.reason;
  }

  getRemain(): number {
    return this.remain;
  }

  getReport(): Array<{ name: string; url: string }> {
    return this.report;
  }

  getServiceEndDate(): string {
    return this.serviceEndDate;
  }

  getSpecialist(): string {
    return this.specialist;
  }

  getStatus(): 'active' | 'hold' | 'disable' | 'stop' {
    return this.status;
  }

  getToday(): number {
    return this.today;
  }

  getUpdatedAt(): number {
    return this.updatedAt;
  }

  getId(): string {
    return this._id;
  }

  get__V(): number {
    return this.__v;
  }

  setAccountId(i: string): this {
    this.accountId = i;
    return this;
  }

  setAdsAccountId(i: string): this {
    this.adsAccountId = i;
    return this;
  }

  setAdsAccountName(i: string): this {
    this.adsAccountName = i;
    return this;
  }

  setAmount(i: number): this {
    this.amount = i;
    return this;
  }

  setBalance(i: number): this {
    this.balance = i;
    return this;
  }

  setBudget(i: number): this {
    this.budget = i;
    return this;
  }

  setCost(i: number): this {
    this.cost = i;
    return this;
  }

  setCreatedAt(i: number): this {
    this.createdAt = i;
    return this;
  }

  setLineToken(
    i: Array<{
      name: string;
      type: 'daily' | 'weekly' | 'monthly';
      time: number;
      token: string;
    }>,
  ): this {
    this.lineToken = i;
    return this;
  }

  setProduct(i: 'facebook' | 'search' | 'gdn' | 'youtube'): this {
    this.product = i;
    return this;
  }

  setReason(i: string): this {
    this.reason = i;
    return this;
  }

  setRemain(i: number): this {
    this.remain = i;
    return this;
  }

  setReport(i: Array<{ name: string; url: string }>): this {
    this.report = i;
    return this;
  }

  setServiceEndDate(i: string): this {
    this.serviceEndDate = i;
    return this;
  }

  setSpecialist(i: string): this {
    this.specialist = i;
    return this;
  }

  setStatus(i: 'active' | 'hold' | 'disable' | 'stop'): this {
    this.status = i;
    return this;
  }

  setToday(i: number): this {
    this.today = i;
    return this;
  }

  setUpdatedAt(i: number): this {
    this.updatedAt = i;
    return this;
  }

  setId(i: string): this {
    this._id = i;
    return this;
  }

  set__V(i: number): this {
    this.__v = i;
    return this;
  }
}

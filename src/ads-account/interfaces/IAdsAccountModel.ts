export interface IAdsAccountModel {
  setId(i: string): this;

  setAccountId(i: string): this;

  setBalance(i: number): this;

  setAdsAccountName(i: string): this;

  setAdsAccountId(i: string): this;

  setProduct(i: 'facebook' | 'search' | 'gdn' | 'youtube'): this;

  setSpecialist(i: string): this;

  setStatus(i: 'active' | 'hold' | 'disable' | 'stop'): this;

  setCreatedAt(i: number): this;

  setUpdatedAt(i: number): this;

  set__V(i: number): this;

  setCost(i: number): this;

  setAmount(i: number): this;

  setBudget(i: number): this;

  setReport(i: Array<{ name: string; url: string }>): this;

  setLineToken(
    i: Array<{
      name: string;
      type: 'daily' | 'weekly' | 'monthly';
      time: number;
      token: string;
    }>,
  ): this;

  setRemain(i: number): this;

  setToday(i: number): this;

  setServiceEndDate(i: string): this;

  setReason(i: string): this;

  getId(): string;

  getAccountId(): string;

  getBalance(): number;

  getAdsAccountName(): string;

  getAdsAccountId(): string;

  getProduct(): 'facebook' | 'search' | 'gdn' | 'youtube';

  getSpecialist(): string;

  getStatus(): 'active' | 'hold' | 'disable' | 'stop';

  getCreatedAt(): number;

  getUpdatedAt(): number;

  get__V(): number;

  getCost(): number;

  getAmount(): number;

  getBudget(): number;

  getReport(): Array<{ name: string; url: string }>;

  getLineToken(): Array<{
    name: string;
    type: 'daily' | 'weekly' | 'monthly';
    time: number;
    token: string;
  }>;

  getRemain(): number;

  getToday(): number;

  getServiceEndDate(): string;

  getReason(): string;
}

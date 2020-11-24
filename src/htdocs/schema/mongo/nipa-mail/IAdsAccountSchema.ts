export interface IAdsAccountSchema {
  _id: any;
  accountId: string;
  balance: number;
  adsAccountName: string;
  adsAccountId: string;
  product: 'facebook' | 'search' | 'gdn' | 'youtube';
  specialist: string;
  status: 'active' | 'hold' | 'disable' | 'stop';
  createdAt: number;
  updatedAt: number;
  __v: number;
  cost: number;
  amount: number;
  budget: number;
  report: Array<{ name: string; url: string }>;
  lineToken: Array<{
    name: string;
    type: 'daily' | 'weekly' | 'monthly';
    time: number;
    token: string;
  }>;
  remain: number;
  today: number;
  serviceEndDate: string;
  reason: string;
}

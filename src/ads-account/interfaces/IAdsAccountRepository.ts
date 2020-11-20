import { Observable } from 'rxjs';
import { IAdsAccountModel } from './IAdsAccountModel';

// TODO review it
export const enum Product {
  FACEBOOK = 'facebook',
  SEARCH = 'search',
  GDN = 'gdn',
  YOUTUBE = 'youtube',
}

export interface IAdsAccountRepository {
  getAdsAccountByProduct(product: Product): Observable<IAdsAccountModel>;
}

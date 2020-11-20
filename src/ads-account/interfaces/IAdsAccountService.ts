import { Observable } from 'rxjs';
import { IAdsAccountModel } from '.';

export interface IAdsAccountService {
  getAdsAccountProductFacebook(): Observable<IAdsAccountModel>;
}

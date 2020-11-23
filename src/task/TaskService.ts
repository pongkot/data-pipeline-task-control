import { ITaskService } from './interfaces';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Repository, Service } from '../common/token';
import { CostRateService } from '../cost-rate';
import { AdsAccountService } from '../ads-account';
import { map, mergeMap } from 'rxjs/operators';
import { IAdsAccountModel } from '../ads-account/interfaces';
import { ICostRateModel } from '../cost-rate/interface';
import { AppLogger } from '../common';
import { ConfigurationRepository } from '../configuration';
import { IConfigurationModel } from '../configuration/interfaces';
import { EncryptionService } from '../encryption';
import { FacebookInsightLvAccountByDateModel } from './FacebookInsightLvAccountByDateModel';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @Inject(APP_LOGGER)
    private readonly logger: AppLogger,
    @Inject(Service.COST_RATE)
    private readonly costRateService: CostRateService,
    @Inject(Service.ADS_ACCOUNT)
    private readonly adsAccount: AdsAccountService,
    @Inject(Service.ENCRYPTION)
    private readonly encryptionService: EncryptionService,
    @Inject(Repository.CONFIGURATION)
    private readonly configurationRepository: ConfigurationRepository,
  ) {
    this.logger.setContext('TaskService');
  }

  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountByDateModel> {
    return this.configurationRepository
      .getConfigById('FACEBOOK_ACCESS_TOKEN')
      .pipe(
        mergeMap((configModel: IConfigurationModel) =>
          this.adsAccount.getAdsAccountProductFacebook().pipe(
            map((adsAccountProductFacebookModel: IAdsAccountModel) => ({
              _id: adsAccountProductFacebookModel.getId(),
              adsAccountId: adsAccountProductFacebookModel.getAdsAccountId(),
              status: adsAccountProductFacebookModel.getStatus(),
              accessToken: this.encryptionService.encrypt(
                configModel.getValue(),
              ),
            })),
            mergeMap(
              (adsAccount: {
                _id: string;
                adsAccountId: string;
                status: string;
                accessToken: string;
              }) =>
                this.costRateService
                  .getCostRateByAdsAccountRecordId(adsAccount._id)
                  .pipe(
                    map((costRateByAdsAccountModel: ICostRateModel) => ({
                      adsAccountId: adsAccount.adsAccountId,
                      status: adsAccount.status,
                      costRate: costRateByAdsAccountModel.getRate(),
                      accessToken: adsAccount.accessToken,
                    })),
                  ),
            ),
            map(
              (adsAccountCostRate: {
                adsAccountId: string;
                status: string;
                costRate: number;
                accessToken: string;
              }) => {
                const doc = {
                  adsAccount: {
                    id: adsAccountCostRate.adsAccountId,
                    status: adsAccountCostRate.status,
                  },
                  facebookAccessToken: adsAccountCostRate.accessToken,
                  timeRange: { since, until },
                  costRate: adsAccountCostRate.costRate,
                };
                return new FacebookInsightLvAccountByDateModel(doc);
              },
            ),
          ),
        ),
      );
  }
}

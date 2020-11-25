import { ITaskService } from './interfaces';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { APP_LOGGER, Mapping, Repository, Service } from '../common/token';
import { CostRateService } from '../cost-rate';
import { AdsAccountService } from '../ads-account';
import { map, mergeMap } from 'rxjs/operators';
import { IAdsAccountModel } from '../ads-account/interfaces';
import { ICostRateModel } from '../cost-rate/interface';
import { AppLogger } from '../common';
import { ConfigurationRepository } from '../configuration';
import { IConfigurationModel } from '../configuration/interfaces';
import { EncryptionService } from '../encryption';
import { TaskMapping } from './TaskMapping';
import {
  FacebookInsightLvAccountTask,
  FacebookInsightLvCampaignTask,
} from './model';

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
    @Inject(Mapping.TASK)
    private readonly taskMapping: TaskMapping,
    @Inject(Repository.CONFIGURATION)
    private readonly configurationRepository: ConfigurationRepository,
  ) {
    this.logger.setContext('TaskService');
  }

  getFacebookInsightLvAccountByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvAccountTask> {
    return this.getFacebookInsightRequireFields().pipe(
      map(
        (adsAccountCostRate: {
          adsAccountId: string;
          status: string;
          costRate: number;
          accessToken: string;
        }) =>
          new FacebookInsightLvAccountTask(
            {
              accessToken: adsAccountCostRate.accessToken,
              id: adsAccountCostRate.adsAccountId,
              status: adsAccountCostRate.status,
            },
            adsAccountCostRate.costRate,
            { since, until },
          ),
      ),
    );
  }

  private getFacebookInsightRequireFields(): Observable<{
    adsAccountId: string;
    status: string;
    costRate: number;
    accessToken: string;
  }> {
    return this.configurationRepository
      .getConfigById('FACEBOOK_ACCESS_TOKEN')
      .pipe(
        mergeMap((configModel: IConfigurationModel) => {
          return this.adsAccount.getAdsAccountProductFacebook().pipe(
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
          );
        }),
      );
  }

  getFacebookInsightLvCampaignByDate(
    since: Date,
    until: Date,
  ): Observable<FacebookInsightLvCampaignTask> {
    return this.getFacebookInsightRequireFields().pipe(
      map(
        (adsAccountCostRate: {
          adsAccountId: string;
          status: string;
          costRate: number;
          accessToken: string;
        }) =>
          new FacebookInsightLvCampaignTask(
            {
              accessToken: adsAccountCostRate.accessToken,
              id: adsAccountCostRate.adsAccountId,
              status: adsAccountCostRate.status,
            },
            adsAccountCostRate.costRate,
            { since, until },
          ),
      ),
    );
  }
}

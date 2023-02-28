/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  CmsConfig,
  Config,
  ConfigInitializerService,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';
import { CdcStoreModule } from '../core/store/cdc-store.module';
import { defaultCdcRoutingConfig } from './config/default-cdc-routing-config';
import { CDC_CORE_FEATURE, CDC_FEATURE } from './feature-name';
import { CdcLogoutGuard } from './guards/cdc-logout.guard';
import { CdcJsService } from './service/cdc-js.service';

export function cdcJsFactory(
  cdcJsService: CdcJsService,
  configInit: ConfigInitializerService
): () => Promise<Config> {
  const func = () =>
    configInit
      .getStable('context', 'cdc')
      .pipe(
        tap(() => {
          cdcJsService.initialize();
        })
      )
      .toPromise();
  return func;
}

export function defaultCdcComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CDC_FEATURE]: {
        cmsComponents: ['GigyaRaasComponent'],
      },
      // by default core is bundled together with components
      [CDC_CORE_FEATURE]: CDC_FEATURE,
    },
  };
  return config;
}

@NgModule({
  imports: [CdcStoreModule],
  providers: [
    provideDefaultConfigFactory(defaultCdcComponentsConfig),
    { provide: LogoutGuard, useExisting: CdcLogoutGuard },
    {
      provide: APP_INITIALIZER,
      useFactory: cdcJsFactory,
      deps: [CdcJsService, ConfigInitializerService],
      multi: true,
    },
    provideDefaultConfig(defaultCdcRoutingConfig),
  ],
})
export class CdcRootModule {}

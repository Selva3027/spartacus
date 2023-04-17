/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: false,
  occBaseUrl:
  'https://localhost:9002',
    // 'https://api.cg79x9wuu9-eccommerc1-s1-public.model-t.myhybris.cloud',
    // 'https://10.237.103.83:9002/',
  occApiPrefix: '/occ/v2/',
  cds: buildProcess.env.CX_CDS ?? false,
  b2b: buildProcess.env.CX_B2B ?? false,
  cdc: buildProcess.env.CX_CDC ?? false,
  cpq: buildProcess.env.CX_CPQ ?? false,
  digitalPayments: buildProcess.env.CX_DIGITAL_PAYMENTS ?? false,
  epdVisualization: buildProcess.env.CX_EPD_VISUALIZATION ?? false,
  s4om: buildProcess.env.CX_S4OM ?? false,
  cdp: buildProcess.env.CX_CDP ?? true,
};

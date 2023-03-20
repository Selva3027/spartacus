/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CdpUpdateProfileModule } from './lib/update-profile/public_api';


@NgModule({
  imports: [CdpUpdateProfileModule],
})
export class CdpModule {}

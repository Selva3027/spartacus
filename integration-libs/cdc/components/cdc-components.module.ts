/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CDCAddressBookModule } from './address-book/cdc-address-book.module';
import { GigyaRaasModule } from './gigya-raas/gigya-raas.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GigyaRaasModule, CDCAddressBookModule],
})
export class CdcComponentsModule {}

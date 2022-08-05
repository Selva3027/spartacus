/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { AsmComponentService } from '../services/asm-component.service';

@Component({
  selector: 'cx-customer-emulation',
  templateUrl: './customer-emulation.component.html',
})
export class CustomerEmulationComponent implements OnInit, OnDestroy {
  customer: User;
  isCustomerEmulationSessionInProgress$: Observable<boolean>;
  protected subscription = new Subscription();

  constructor(
    protected asmComponentService: AsmComponentService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.userAccountFacade.get().subscribe((user) => {
        if (user) {
          this.customer = user;
        }
      })
    );
    this.isCustomerEmulationSessionInProgress$ =
      this.asmComponentService.isCustomerEmulationSessionInProgress();
  }

  logoutCustomer() {
    this.asmComponentService.logoutCustomer();
  }

  openCustomer360() {
    /*
    this.modalRef = this.modalService?.open(AsmCustomer360Component, {
      size: 'xl',
      windowClass: 'asm-customer-360',
      ariaLabelledBy: 'asm-customer-360-title',
      ariaDescribedBy: 'asm-customer-360-desc',
    });
    this.modalRef.componentInstance.customer = this.customer;
    */
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

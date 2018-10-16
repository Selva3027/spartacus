import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import * as NgrxStore from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { PaymentMethodComponent } from './payment-method.component';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
import { CartDataService } from '../../../../cart/services/cart-data.service';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockPaymentMethod1 = {
  accountHolderName: 'Name 1',
  cardNumber: '1111111111',
  cardType: 'Visa',
  expiryMonth: '01',
  expiryYear: '3000',
  cvn: '111'
};

const mockPaymentMethod2 = {
  accountHolderName: 'Name 2',
  cardNumber: '2222222222',
  cardType: 'Visa',
  expiryMonth: '02',
  expiryYear: '3000',
  cvn: '222'
};

const mockPaymentMethods = [mockPaymentMethod1, mockPaymentMethod2];

@Component({
  selector: 'y-payment-form',
  template: ''
})
class MockPaymentFormComponent {}

@Component({
  selector: 'y-spinner',
  template: ''
})
class MockSpinnerComponent {}

@Component({
  selector: 'y-card',
  template: ''
})
class MockCardComponent {
  @Input()
  border;
  @Input()
  content;
}

describe('PaymentMethodComponent', () => {
  let component: PaymentMethodComponent;
  let fixture: ComponentFixture<PaymentMethodComponent>;
  let service: CheckoutService;
  let mockUserSelectors: {
    getPaymentMethods: BehaviorSubject<any[]>;
    getPaymentMethodsLoading: BehaviorSubject<boolean>;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [
        PaymentMethodComponent,
        MockPaymentFormComponent,
        MockCardComponent,
        MockSpinnerComponent
      ],
      providers: [CheckoutService, CartService, CartDataService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);

    mockUserSelectors = {
      getPaymentMethods: new BehaviorSubject([]),
      getPaymentMethodsLoading: new BehaviorSubject(false)
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromUser.getPaymentMethods:
          return () => mockUserSelectors.getPaymentMethods;
        case fromUser.getPaymentMethodsLoading:
          return () => mockUserSelectors.getPaymentMethodsLoading;
      }
    });

    spyOn(service, 'loadUserPaymentMethods').and.callThrough();
    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get existing payment methods if they do not exist', () => {
    mockUserSelectors.getPaymentMethods.next([]);
    component.ngOnInit();
    component.existingPaymentMethods$.subscribe(() => {
      expect(service.loadUserPaymentMethods).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get existing payment methods if they exist', () => {
    const mockPayments = mockPaymentMethods;
    mockUserSelectors.getPaymentMethods.next(mockPayments);
    component.ngOnInit();
    component.existingPaymentMethods$.subscribe(data => {
      expect(data).toBe(mockPayments);
      expect(component.cards.length).toEqual(2);
    });
  });

  it('should call getCardContent() to get payment method card data', () => {
    const card = component.getCardContent(mockPaymentMethod1);
    expect(card.title).toEqual('');
    expect(card.textBold).toEqual('Name 1');
    expect(card.text).toEqual(['1111111111', 'Expires: 01/3000']);
  });

  it('should call paymentMethodSelected(paymentDetails, index)', () => {
    const card1 = { title: 'test card 1' };
    const card2 = { title: 'test card 2' };
    const card3 = { title: 'test card 3' };
    component.cards.push(card1, card2, card3);
    component.paymentMethodSelected(mockPaymentMethod1, 1);

    expect(component.selectedPayment).toEqual(mockPaymentMethod1);
    expect(component.cards[0].header).toEqual('');
    expect(component.cards[1].header).toEqual('SELECTED');
    expect(component.cards[2].header).toEqual('');
  });

  it('should call next() to submit request', () => {
    component.selectedPayment = mockPaymentMethod1;
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: mockPaymentMethod1,
      newPayment: false
    });
  });

  it('should call addNewPaymentMethod()', () => {
    component.addNewPaymentMethod(mockPaymentMethod1);
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: mockPaymentMethod1,
      newPayment: true
    });
  });

  it('should call showNewAddressForm()', () => {
    component.showNewAddressForm();
    expect(component.newPaymentFormManuallyOpened).toEqual(true);
  });

  it('should call back()', () => {
    component.back();
    expect(component.backStep.emit).toHaveBeenCalled();
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(
        By.css('.y-existing-payment-methods__continue-btn')
      );

    it('should be disabled when no payment method is selected', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next(mockPaymentMethods);
      component.selectedPayment = null;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(true);
    });

    it('should be enabled when payment method is selected', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next(mockPaymentMethods);
      component.selectedPayment = mockPaymentMethod1;
      fixture.detectChanges();
      expect(getContinueBtn().nativeElement.disabled).toEqual(false);
    });
  });

  describe('UI cards with payment methods', () => {
    const getCards = () => fixture.debugElement.queryAll(By.css('y-card'));

    it('should represent all existng payment methods', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next(mockPaymentMethods);
      fixture.detectChanges();
      expect(getCards().length).toEqual(2);
    });

    it('should not display if there are no existng payment methods', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next([]);
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });

    it('should not display if existng payment methods are loading', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(true);
      mockUserSelectors.getPaymentMethods.next([]);
      fixture.detectChanges();
      expect(getCards().length).toEqual(0);
    });
  });

  describe('UI new payment method form', () => {
    const getAddNewAddressBtn = () =>
      fixture.debugElement.query(
        By.css('.y-existing-payment-methods__add-new-payment-btn')
      );
    const getNewAddressForm = () =>
      fixture.debugElement.query(
        By.css('.y-existing-payment-methods__new-payment-form')
      );

    it('should be visible after user clicks "add new payment method" button', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next(mockPaymentMethods);
      fixture.detectChanges();
      getAddNewAddressBtn().nativeElement.click();

      fixture.detectChanges();
      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should be visible on init if there are no existing payment methods', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next([]);
      fixture.detectChanges();

      expect(getNewAddressForm()).toBeTruthy();
    });

    it('should be hidden on init if there are some existing payment methods', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next(mockPaymentMethods);
      fixture.detectChanges();

      expect(getNewAddressForm()).toBeFalsy();
    });

    it('should be hidden when when existing adddress are loading', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(true);
      mockUserSelectors.getPaymentMethods.next([]);
      fixture.detectChanges();

      expect(getNewAddressForm()).toBeFalsy();
    });
  });

  describe('UI spinner', () => {
    const getSpinner = () => fixture.debugElement.query(By.css('y-spinner'));

    it('should be visible when existing adddress are loading', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(true);
      mockUserSelectors.getPaymentMethods.next([]);
      fixture.detectChanges();
      expect(getSpinner()).toBeTruthy();
    });

    it('should be hidden when loading existing adddress has completed', () => {
      mockUserSelectors.getPaymentMethodsLoading.next(false);
      mockUserSelectors.getPaymentMethods.next(mockPaymentMethods);
      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();
    });
  });
});

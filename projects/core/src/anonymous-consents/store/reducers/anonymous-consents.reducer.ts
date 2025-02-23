/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
} from '../../../model/consent.model';
import { AnonymousConsentsActions } from '../actions/index';

export const initialState: AnonymousConsent[] = [];

export function toggleConsentStatus(
  consents: AnonymousConsent[],
  templateCode: string,
  status: ANONYMOUS_CONSENT_STATUS
): AnonymousConsent[] {
  if (!consents) {
    return [];
  }

  return consents.map((consent) => {
    if (consent.templateCode === templateCode) {
      consent = {
        ...consent,
        consentState: status,
      };
    }
    return consent;
  });
}

export function reducer(
  state = initialState,
  action: AnonymousConsentsActions.AnonymousConsentsActions
): AnonymousConsent[] {
  switch (action.type) {
    case AnonymousConsentsActions.GIVE_ANONYMOUS_CONSENT: {
      return toggleConsentStatus(
        state,
        action.templateCode,
        ANONYMOUS_CONSENT_STATUS.GIVEN
      );
    }

    case AnonymousConsentsActions.WITHDRAW_ANONYMOUS_CONSENT: {
      return toggleConsentStatus(
        state,
        action.templateCode,
        ANONYMOUS_CONSENT_STATUS.WITHDRAWN
      );
    }

    case AnonymousConsentsActions.SET_ANONYMOUS_CONSENTS: {
      return action.payload;
    }
  }

  return state;
}

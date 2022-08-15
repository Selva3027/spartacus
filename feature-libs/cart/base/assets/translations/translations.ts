/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const cartBaseTranslations: TranslationResources = {
  en,
};

export const cartBaseTranslationChunksConfig: TranslationChunksConfig = {
  cart: [
    'cartDetails',
    'cartItems',
    'orderCost',
    'voucher',
    'saveForLaterItems',
    'clearCart',
    'validation',
  ],
};

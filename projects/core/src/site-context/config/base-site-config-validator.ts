/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteContextConfig } from './site-context-config';
import { getContextParameterDefault } from './context-config-utils';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';

export function baseSiteConfigValidator(config: SiteContextConfig) {
  if (getContextParameterDefault(config, BASE_SITE_CONTEXT_ID) === undefined) {
    return 'Please configure context.parameters.baseSite before using storefront library!';
  }
}

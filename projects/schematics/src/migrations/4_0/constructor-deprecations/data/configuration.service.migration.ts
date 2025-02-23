/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANY_TYPE,
  CONFIG,
  CONFIGURATION_SERVICE,
  DEFAULT_CONFIG,
  ROOT_CONFIG,
  UNIFIED_INJECTOR,
} from '../../../../shared/constants';
import { SPARTACUS_CORE } from '../../../../shared/libs-constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const CONFIGURATION_SERVICE_MIGRATION: ConstructorDeprecation = {
  class: CONFIGURATION_SERVICE,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: ROOT_CONFIG,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: ROOT_CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: DEFAULT_CONFIG,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DEFAULT_CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: UNIFIED_INJECTOR,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CONFIG,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
  ],
  removeParams: [
    {
      className: ROOT_CONFIG,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: ROOT_CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: DEFAULT_CONFIG,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DEFAULT_CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: UNIFIED_INJECTOR,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CONFIG,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
  ],
  addParams: [
    {
      className: ROOT_CONFIG,
      literalInference: CONFIG,
      injectionToken: {
        token: ROOT_CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: DEFAULT_CONFIG,
      literalInference: CONFIG,
      injectionToken: {
        token: DEFAULT_CONFIG,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: UNIFIED_INJECTOR,
      importPath: SPARTACUS_CORE,
    },
    {
      className: CONFIG,
      importPath: SPARTACUS_CORE,
    },
  ],
};

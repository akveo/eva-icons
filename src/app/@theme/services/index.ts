/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { EvaVersionService } from './version.service';
import { DialogStateService } from './dialog-state.service';
import { EvaAnalytics } from './analytics.service';


export const evaServices = [
  EvaVersionService,
  DialogStateService,
  EvaAnalytics,
];

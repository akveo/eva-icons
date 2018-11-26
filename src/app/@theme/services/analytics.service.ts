/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable, Inject } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';

@Injectable()
export class EvaAnalytics {
  private enabled: boolean;

  constructor(@Inject(NB_WINDOW) private window) {
    this.enabled = this.window.location.href.indexOf('akveo.github.io') >= 0;
  }

  trackEvent(eventName: string, eventVal: string = '') {
    if (this.enabled) {
      this.gtm({ event: eventName, eventValue: eventVal });
    }
  }

  private isGaLoaded() {
    return this.window.ga;
  }

  private gtm(params) {
    if (this.isGaLoaded()) {
      this.window.dataLayer.push(params);
    } else {
      setTimeout(() => {
        this.gtm(params);
      }, 500);
    }
  }
}

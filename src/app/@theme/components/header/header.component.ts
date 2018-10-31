/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { UrlService } from '../../../@core/data/service/url.service';
import { EvaAnalytics } from '../../services/analytics.service';

@Component({
  selector: 'eva-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  zipUrl: string;

  constructor(private urlService: UrlService,
              private analytics: EvaAnalytics) {
    this.zipUrl = this.urlService.getZippedIconsUrl();
  }

  clickOnDownloadPack() {
    this.analytics.trackEvent('download-pack', 'download-icons-design-pack');
  }
}

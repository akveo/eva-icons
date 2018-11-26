/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { UrlService } from '../../../../@core/data/service/url.service';
import { NbDialogRef } from '@nebular/theme';
import { EvaAnalytics } from '../../../services/analytics.service';

@Component({
  selector: 'eva-download-icon',
  styleUrls: ['./download-icon.component.scss'],
  templateUrl: './download-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadIconComponent implements AfterViewInit {

  @Input() selectedIcon: string = '';
  @Input() iconType: string = '';

  selectedFormat: string;
  downloadControls: { format: string; title: string }[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private urlService: UrlService,
              protected dialogRef: NbDialogRef<DownloadIconComponent>,
              private analytics: EvaAnalytics) {}

  ngAfterViewInit() {
    this.downloadControls =
      this.urlService.getDownloadItemsDate(this.iconType, this.selectedIcon);

    this.changeDetectorRef.detectChanges();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  clickOnDownloadIcon(icon: { format: string; title: string }) {
    this.analytics.trackEvent('downloadIcon', `${this.selectedIcon}.${icon.format}`);
  }
}

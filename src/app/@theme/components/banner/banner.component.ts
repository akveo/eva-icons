/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';

const HIDE_BANNER_KEY = 'HIDE_RELEASE_2_BANNER';

@Component({
  selector: 'eva-release-banner',
  template: `
    <div class="heading-with-icon">
      <img class="icon" src="assets/img/bell-white.svg" alt="bell">
      <h1 class="banner-heading">Nebular 3.0 stable <br> with 30+ components is out!</h1>
      <button class="close-button" aria-label="close" (click)="closeBanner()">
        <i [innerHTML]="'close' | eva: { width: 24, height: 24, fill: '#ffffff' }"></i>
      </button>
    </div>
    <p class="cta">
      Don't forget to <a class="cta-link"
                         href="https://akveo.github.io/nebular?utm_source=eva-icons&utm_medium=banner_link">
      check out</a> and star our repo :)
    </p>
  `,
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  storage: Storage;

  @HostBinding('attr.hidden')
  isHidden: boolean | null = null;

  @HostBinding('attr.dir')
  dir = 'ltr';

  constructor(@Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    this.storage = this.window.localStorage;
    this.isHidden = this.isBannerKeyInLocalStorage();
  }

  isBannerKeyInLocalStorage(): boolean | null {
    return this.storage && this.storage.getItem(HIDE_BANNER_KEY)
      ? true
      : null;
  }

  closeBanner() {
    if (this.storage) {
      this.storage.setItem(HIDE_BANNER_KEY, 'true');
    }

    this.isHidden = true;
  }
}

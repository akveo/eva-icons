/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable()
export class UrlService {

  private prefix_folder = 'package-build';

  readonly DOWNLOAD_PROD_ZIP_URL = 'eva-icons.zip';
  readonly DOWNLOAD_ZIP_URL = `${this.prefix_folder}/eva-icons.zip`;
  readonly DOWNLOAD_URLS = {
    svg: `${this.prefix_folder}/type/svg/name.svg`,
    png: `${this.prefix_folder}/type/png/128/name.png`,
  };
  readonly DOWNLOAD_PROD_URLS = {
    svg: 'type/svg/name.svg',
    png: 'type/png/128/name.png',
  };

  protected downloadItemsData = [
    {
      format: 'svg',
      title: 'SVG',
      href: this.getDownloadItemUrl('svg'),
    },
    {
      format: 'png',
      title: 'PNG',
      href: this.getDownloadItemUrl('png'),
    },
  ];

  getDownloadItemUrl(format) {
    return environment.production ?
      this.DOWNLOAD_PROD_URLS[format] :
      this.DOWNLOAD_URLS[format];
  }

  getZippedIconsUrl() {
    return environment.production ?
      this.DOWNLOAD_PROD_ZIP_URL :
      this.DOWNLOAD_ZIP_URL;
  }

  getDownloadItemsDate(type, name) {
    const matches = {
      type,
      name,
    };

    return this.downloadItemsData.map((item) => {
      return {
        ...item,
        href: this.getIconHref(item.href, matches),
      };
    });
  }


  private getIconHref(href, matches) {
    return href.replace(/type|name/gi, (matched) => {
      return matches[matched];
    });
  }
}

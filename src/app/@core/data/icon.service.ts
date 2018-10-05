import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { icons } from '../../../../package-build/eva';

class Icons {
  fill: string[];
  outline: string[];
}

export class IconServiceData {
  icons: string[];
  message: string;
}

@Injectable()
export class IconService {

  private icons: Icons;

  data: IconServiceData = {
    icons: [],
    message: '',
  };

  constructor() {
    this.icons = Object.keys(icons)
      .reduce((result, item): any => {
        if (item.indexOf('outline') === -1) {
          result['fill'] = result['fill'].concat(item);
        } else {
          result['outline'] = result['outline'].concat(item);
        }

        return result;
      }, { fill: [], outline: [] });
  }

  getIconsData(type: string): Observable<IconServiceData> {
    this.data.icons = this.icons[type];

    return observableOf(this.data);
  }

  getFilteredIconsData(searchKey: string, type: string): Observable<IconServiceData> {
    const foundIcons = this.icons[type].filter((item) => {
      return item.indexOf(searchKey.toLowerCase()) !== -1;
    });

    this.data.icons = foundIcons;
    this.data.message = foundIcons.length === 0 ? 'There are no results that match your search' : '';

    return observableOf(this.data);
  }
}

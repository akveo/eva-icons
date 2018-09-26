import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { icons } from '../../../../package-build/eva';

@Injectable()
export class IconService {

  data: string[];

  constructor() {
    this.data = Object.keys(icons)
      .reduce((result, item): any => {
        if (item.indexOf('outline') === -1) {
          result['fill'] = result['fill'].concat(item);
        } else {
          result['outline'] = result['outline'].concat(item);
        }

        return result;
      }, { fill: [], outline: [] });
  }

  getIconsData(type: string): Observable<string[]> {
    return observableOf(this.data[type]);
  }

  getFilteredIconsData(searchKey: string, type: string) {
    const data = this.data[type].filter((item) => {
      return item.indexOf(searchKey) !== -1;
    });

    return observableOf(data);
  }
}

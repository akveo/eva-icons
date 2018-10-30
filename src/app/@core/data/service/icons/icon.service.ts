/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { icons } from '../../../../../../package-build/eva';
import { fillOrder } from './fill-icons-order';
import { outlineOrder } from './outline-icons-order';
import { iconsTags } from './icons-tags';

class Icon {
  name: string;
  order: number;
  tags: string[];
}

class Icons {
  fill: Icon[];
  outline: Icon[];
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

  private sortIcons = (first, second) => first.order - second.order;
  private orders = {
    fill: fillOrder,
    outline: outlineOrder,
  };

  constructor() {
    this.icons = Object.keys(icons)
      .reduce((result, item, index, iconsArray): Icons => {
        const itemType = item.indexOf('outline') === -1 ? 'fill' : 'outline';
        const iconData = this.getIconData(item, itemType);

        result[itemType] = result[itemType].concat(iconData);

        // sort items in last iteration
        if (index === iconsArray.length - 1) {
          result['outline'].sort(this.sortIcons);
          result['fill'].sort(this.sortIcons);
        }

        return result;
      }, { fill: [], outline: [] });
  }

  getIconData(icoName: string, iconType: string): Icon {
    const groupTagName = icoName.replace('-outline', '');
    const tags = this.getIconsTags(groupTagName, icoName);

    return {
      name: icoName,
      order: this.orders[iconType][icoName],
      tags,
    };
  }

  getIconsTags(groupName: string, icoName: string): string[] {
    return iconsTags[groupName] && iconsTags[groupName].length > 0 ?
      iconsTags[groupName].concat(icoName) :
      [icoName];
  }

  getIconsData(type: string): Observable<IconServiceData> {
    this.data.icons = this.icons[type];

    return observableOf(this.data);
  }

  getFilteredIconsData(searchKey: string, type: string): Observable<IconServiceData> {
    const foundIcons = this.icons[type].filter((item) => {
      return item.tags.some((tag) => tag.indexOf(searchKey.toLowerCase()) !== -1);
    });

    this.data.icons = foundIcons;
    this.data.message = foundIcons.length === 0 ? 'Oops… here are no results that match your search.' : '';

    return observableOf(this.data);
  }
}

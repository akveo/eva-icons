/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eva-type-switcher',
  templateUrl: './type-switcher.component.html',
  styleUrls: ['./type-switcher.component.scss'],
})

export class TypeSwitcherComponent {

  @Output() changeIconsType: EventEmitter<string> = new EventEmitter();

  @Input() iconsType: string;
  @Input() isMobileView: string;

  navItems = [
    {
      title: 'Outline',
      type: 'outline',
      iconName: 'star-outline',
    },
    {
      title: 'Fill',
      type: 'fill',
      iconName: 'star',
    },
  ];

  changeType(value) {
    this.changeIconsType.emit(value);
    this.iconsType = value;
  }
}

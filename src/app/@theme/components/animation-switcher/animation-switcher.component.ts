/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'eva-animation-switcher',
  templateUrl: './animation-switcher.component.html',
  styleUrls: ['./animation-switcher.component.scss'],
})

export class AnimationSwitcherComponent implements OnInit {

  @Output() changeAnimation: EventEmitter<string> = new EventEmitter();

  @Input() animation: string;
  @Input() isMobileView: string;

  selectedItem: string;

  ngOnInit() {
    this.selectedItem = this.animation;
  }

  animationItems = [
    {
      title: 'Zoom',
      iconName: 'maximize-outline',
      animationType: 'zoom',
    },
    {
      title: 'Pulse',
      iconName: 'activity-outline',
      animationType: 'pulse',
    },
    {
      title: 'Shake',
      iconName: 'shake-outline',
      animationType: 'shake',
    },
    {
      title: 'Flip in Y',
      iconName: 'flip-2-outline',
      animationType: 'flip',
    },
  ];

  changeAnimationType(value) {
    this.changeAnimation.emit(value);
    this.animation = value;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

const FULL = 'full';
const ICON = 'icon';

@Component({
  selector: 'eva-list-view-switcher',
  templateUrl: './list-view-switcher.component.html',
  styleUrls: ['./list-view-switcher.component.scss'],
})
export class ListViewSwitcherComponent {

  @Output() changeView: EventEmitter<string> = new EventEmitter();

  @Input() view: string;

  get isFullViewMode() {
    return this.view === FULL;
  }

  get isIconViewMode() {
    return this.view === ICON;
  }

  changeViewMode(value) {
    this.changeView.emit(value);
    this.view = value;
  }
}

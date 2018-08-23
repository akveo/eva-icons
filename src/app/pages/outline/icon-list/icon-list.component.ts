import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

const FULL = 'full';
const ICON = 'icon';

@Component({
  selector: 'eva-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconListComponent {

  @Input() icons: string[];
  @Input() view: string;

  @HostBinding('class.full-icon-mode')
  get isFullViewMode() {
    return this.view === FULL;
  }

  @HostBinding('class.only-icon-mode')
  get isIconViewMode() {
    return this.view === ICON;
  }
}

import { NgModule } from '@angular/core';

import { EvaThemeModule } from '../@theme/theme.module';

import { OutlineComponent } from './outline/outline.component';
import { FillComponent } from './fill/fill.component';
import { IconListComponent } from './outline/icon-list/icon-list.component';
import { ListViewSwitcherComponent } from './outline/list-view-switcher/list-view-switcher.component';


@NgModule({
  imports: [
    EvaThemeModule,
  ],
  declarations: [
    OutlineComponent,
    FillComponent,
    IconListComponent,
    ListViewSwitcherComponent,
  ],
})
export class PagesModule {
}

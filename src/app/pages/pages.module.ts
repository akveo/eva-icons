import { NgModule } from '@angular/core';

import { EvaThemeModule } from '../@theme/theme.module';
import { CoreModule } from '../@core/core.module';

import { OutlineComponent } from './outline/outline.component';
import { FillComponent } from './fill/fill.component';


@NgModule({
  imports: [
    CoreModule,
    EvaThemeModule,
  ],
  declarations: [
    OutlineComponent,
    FillComponent,
  ],
})
export class PagesModule {
}

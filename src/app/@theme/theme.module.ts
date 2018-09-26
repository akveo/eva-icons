import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DownloadIconComponent } from './components/modals/download-icon/download-icon.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { ListViewSwitcherComponent } from './components/list-view-switcher/list-view-switcher.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
// components

// services
import evaServices from './services';
// services

// pipes
import { EvaIconsPipe } from './pipes/eva-icons.pipe';
// pipes

import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbThemeModule,
  NbOverlayModule,
  NbDialogModule,
  NbCheckboxModule,
} from '@nebular/theme';

const PIPES = [
  EvaIconsPipe,
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    NbOverlayModule,
    NbDialogModule,
    NbCheckboxModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    DownloadIconComponent,
    PageContainerComponent,
    ListViewSwitcherComponent,
    IconListComponent,

    ...PIPES,
  ],
  exports: [
    RouterModule,
    CommonModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    NbDialogModule,
    NbOverlayModule,
    NbCheckboxModule,

    FooterComponent,
    HeaderComponent,
    PageContainerComponent,
    ListViewSwitcherComponent,
    IconListComponent,

    ...PIPES,
  ],
  entryComponents: [
    DownloadIconComponent,
  ],
})
export class EvaThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: EvaThemeModule,
      providers: [
        ...NbThemeModule.forRoot({ name: 'eva' }).providers,
        ...evaServices,
        ...NbMenuModule.forRoot().providers,
        ...NbOverlayModule.forRoot().providers,
        ...NbDialogModule.forRoot().providers,
      ],
    };
  }
}

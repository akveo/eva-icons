import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DownloadIconComponent } from './components/modals/download-icon/download-icon.component';
import { DownloadIconsComponent } from './components/modals/download-icons/download-icons.component';
// components

// services
import evaServices from './services';
// services

import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbThemeModule,
  NbOverlayModule,
  NbModalModule,
  NbCheckboxModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    NbOverlayModule,
    NbModalModule,
    NbCheckboxModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    DownloadIconComponent,
    DownloadIconsComponent,
  ],
  exports: [
    RouterModule,
    CommonModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    NbModalModule,
    NbOverlayModule,
    NbCheckboxModule,

    FooterComponent,
    HeaderComponent,
  ],
  entryComponents: [
    DownloadIconComponent,
    DownloadIconsComponent,
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
      ],
    };
  }
}

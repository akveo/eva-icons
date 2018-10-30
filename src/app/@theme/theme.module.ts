/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DownloadIconComponent } from './components/modals/download-icon/download-icon.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { TypeSwitcherComponent } from './components/type-switcher/type-switcher.component';
import { AnimationSwitcherComponent } from './components/animation-switcher/animation-switcher.component';
// components

// services
import { evaServices } from './services';
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
  NbSpinnerModule,
  NbPopoverModule, NbSelectModule,
} from '@nebular/theme';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent,
  DownloadIconComponent,
  PageContainerComponent,
  IconListComponent,
  TypeSwitcherComponent,
  AnimationSwitcherComponent,
];

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
    NbSpinnerModule,
    NbPopoverModule,
    NbSelectModule,
  ],
  declarations: [
    ...COMPONENTS,

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
    NbSpinnerModule,
    NbSelectModule,

    FooterComponent,
    HeaderComponent,
    PageContainerComponent,
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

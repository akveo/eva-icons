import { RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
// components

// services
import evaServices from './services';
// services


import {
  NbMenuModule,
  NbLayoutModule,
  NbCardModule,
  NbThemeModule,
} from '@nebular/theme';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
  ],
  exports: [
    RouterModule,
    CommonModule,
    NbMenuModule,
    NbLayoutModule,
    NbCardModule,
    FooterComponent,
    HeaderComponent,
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
      ],
    };
  }
}

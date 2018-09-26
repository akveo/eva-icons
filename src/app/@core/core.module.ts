import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { EvaIconsPipe } from './pipes/eva-icons.pipe';

const PIPES = [
  EvaIconsPipe,
];

const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [...PIPES],
  declarations: [...PIPES],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}

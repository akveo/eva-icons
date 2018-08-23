import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { FillComponent } from './pages/fill/fill.component';
import { OutlineComponent } from './pages/outline/outline.component';

const routes: Routes = [
  {
    path: 'outline',
    component: OutlineComponent,
  },
  {
    path: 'fill',
    component: FillComponent,
  },
  { path: '', redirectTo: 'outline', pathMatch: 'full' },
  { path: '**', redirectTo: 'outline' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}

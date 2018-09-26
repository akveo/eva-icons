import { Component } from '@angular/core';

@Component({
  selector: 'eva-fill',
  template: `
    <eva-page-container [iconsType]="type"></eva-page-container>
  `,
})
export class FillComponent {

  type: string = 'fill';
}

import { Component } from '@angular/core';

@Component({
  selector: 'eva-outline',
  template: `
    <eva-page-container [iconsType]="type"></eva-page-container>
  `,
})
export class OutlineComponent {

  type: string = 'outline';
}

import {DomSanitizer} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';

import { icons } from '../../../../package-build/eva';

@Pipe({ name: 'eva' })
export class EvaIconsPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(icon: string, height: number = 24, width: number = 24, fill: string = 'inherit') {
    return this.sanitizer.bypassSecurityTrustHtml(icons[icon].toSvg({
      width,
      height,
      fill,
    }));
  }
}

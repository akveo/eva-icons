import { Injectable } from '@angular/core';

@Injectable()
export class EvaVersionService {

  getEvoVersion() {
    return require('../../../../package.json').version;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class EvoVersionService {

  getEvoVersion() {
    return require('../../../../package.json').version;
  }
}

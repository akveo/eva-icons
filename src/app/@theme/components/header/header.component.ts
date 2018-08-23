import { Component } from '@angular/core';
import { EvoVersionService } from '../../services/version.service';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'eva-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  currentVersion: string;

  constructor(private versionService: EvoVersionService) {
    this.currentVersion = this.versionService.getEvoVersion();
  }

  mainMenu: NbMenuItem[] = [
    {
      title: 'Outline',
      link: '/outline',
      icon: 'nb-star',
    },
    {
      title: 'Fill',
      link: '/fill',
      icon: 'nb-star',
    },
  ];
}

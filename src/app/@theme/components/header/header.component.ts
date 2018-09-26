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
  mainMenu: NbMenuItem[] = [
    {
      title: 'Outline',
      link: '/outline',
      icon: 'eva eva-star-outline',
    },
    {
      title: 'Fill',
      link: '/fill',
      icon: 'eva eva-star-outline',
    },
  ];

  constructor(private versionService: EvoVersionService) {
    this.currentVersion = this.versionService.getEvoVersion();
  }
}

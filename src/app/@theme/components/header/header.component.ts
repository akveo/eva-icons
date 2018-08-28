import { Component } from '@angular/core';
import { EvoVersionService } from '../../services/version.service';
import { NbMenuItem, NbModalService } from '@nebular/theme';

import { DownloadIconsComponent } from '../modals/download-icons/download-icons.component';

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
      icon: 'nb-star',
    },
    {
      title: 'Fill',
      link: '/fill',
      icon: 'nb-star',
    },
  ];

  constructor(private versionService: EvoVersionService,
              private modalService: NbModalService) {
    this.currentVersion = this.versionService.getEvoVersion();
  }

  openIconsDowloadModal() {
    this.modalService.show(
      DownloadIconsComponent,
      {
        hasBackdrop: true,
        backdropClass: 'download-icons',
        closeOnBackdropClick: true,
      },
    );
  }
}

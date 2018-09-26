import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

import { IconService } from '../../../@core/data/icon.service';
import { debounceTime, delay, map, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { DownloadIconComponent } from '../modals/download-icon/download-icon.component';

@Component({
  selector: 'eva-page-container',
  templateUrl: 'page-container.component.html',
  styleUrls: ['page-container.component.scss'],
})
export class PageContainerComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  @Input() iconsType: string;

  icons: string[] = [];
  view: string = 'full';

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private iconService: IconService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialogService: NbDialogService) {
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        delay(0),
        map(params => params.searchKey),
        tap((searchKeyValue: string) => {
          const inputValue = this.searchInput.nativeElement.value;

          if (!inputValue && searchKeyValue) {
            this.searchInput.nativeElement.value = searchKeyValue;
          }
        }),
        mergeMap((searchKeyValue: string) => {
          return searchKeyValue ?
            this.iconService.getFilteredIconsData(searchKeyValue, this.iconsType) :
            this.iconService.getIconsData(this.iconsType);
        }),
      )
      .subscribe((iconsData: string[]) => {
        this.icons = iconsData;
      });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(500),
      )
      .subscribe((event: any) => {
        const searchKeyValue = event.target.value;

        if (searchKeyValue) {
          this.router.navigate(
            [this.iconsType],
            { queryParams: { searchKey: searchKeyValue }});
        } else {
          const url = this.router.url.substring(0, this.router.url.indexOf('?'));

          this.router.navigateByUrl(url);
        }
      });
  }

  changeView(viewMode) {
    this.view = viewMode;
  }

  clickIcon(icon) {
    const modalRef = this.dialogService.open(
      DownloadIconComponent,
      {
        hasBackdrop: true,
        backdropClass: 'download-icon',
        closeOnBackdropClick: true,
      },
    );
    const componentInstance = modalRef.componentRef.instance;

    componentInstance.selectedIcon = icon;
    componentInstance.iconType = this.iconsType;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  NbDialogService,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService,
} from '@nebular/theme';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';

import { IconService, IconServiceData } from '../../../@core/data/service/icons/icon.service';
import { debounceTime, delay, mergeMap, takeWhile, tap } from 'rxjs/operators';
import { DownloadIconComponent } from '../modals/download-icon/download-icon.component';
import { DialogStateService } from '../../services/dialog-state.service';
import { EvaVersionService } from '../../services/version.service';
import { EvaAnalytics } from '../../services/analytics.service';

@Component({
  selector: 'eva-page-container',
  templateUrl: 'page-container.component.html',
  styleUrls: ['page-container.component.scss'],
})
export class PageContainerComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('iconsBlock') iconsElement: ElementRef;

  currentVersion: string;
  iconsType: string = 'outline';
  isInputFocus = false;
  icons: string[] = [];
  message: string = '';
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;
  animation: string = 'zoom';

  constructor(private iconService: IconService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialogService: NbDialogService,
              private breakpointService: NbMediaBreakpointsService,
              private themeService: NbThemeService,
              private dialogStateService: DialogStateService,
              private versionService: EvaVersionService,
              private analytics: EvaAnalytics) {
    this.currentVersion = this.versionService.getEvoVersion();
    this.breakpoints = this.breakpointService.getBreakpointsMap();

    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams
      .pipe(
        takeWhile(() => this.alive),
        delay(0),
        tap((params) => {
          const inputValue = this.searchInput.nativeElement.value;

          if (!inputValue && params.searchKey) {
            this.searchInput.nativeElement.value = params.searchKey;
          }

          if (params.type && this.iconsType !== params.type) {
            this.iconsType = params.type;
          }
        }),
        mergeMap((params) => {
          return params.searchKey && params.type ?
            this.iconService.getFilteredIconsData(params.searchKey, params.type) :
            this.iconService.getIconsData(this.iconsType);
        }),
      )
      .subscribe((iconsData: IconServiceData) => {
        this.icons = iconsData.icons;
        this.message = iconsData.message;
      });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(500),
      )
      .subscribe((event: any) => {
        const searchKeyValue = event.target.value;

        if (searchKeyValue) {
          this.updateQueryParams({ searchKey: searchKeyValue, type: this.iconsType });
        } else {
          const url = this.router.url.substring(0, this.router.url.indexOf('?'));

          this.router.navigateByUrl(url);
        }
      });
  }

  get placeholder() {
    return this.isLoading || this.noSearchResults ? '' : `Search ${this.icons.length} Icons`;
  }

  get noSearchResults() {
    return (
      this.message &&
      this.icons.length === 0
    );
  }

  get isLoading() {
    return (
      !this.message &&
      this.icons.length === 0
    );
  }

  get isMobileMode() {
    return this.breakpoint.width <= this.breakpoints.sm;
  }

  clickIcon(icon) {
    this.analytics.trackEvent('openIconDialog', icon);

    if (this.isMobileMode) {
      return;
    }

    const modalRef = this.dialogService.open(
      DownloadIconComponent,
      {
        backdropClass: 'download-icon',
      },
    );
    const componentInstance = modalRef.componentRef.instance;

    componentInstance.selectedIcon = icon;
    componentInstance.iconType = this.iconsType;

    this.dialogStateService.changeDialogState('open');

    modalRef.onClose
      .subscribe(() => {
        this.dialogStateService.changeDialogState('close');
      });
  }

  handleFocusInput() {
    this.isInputFocus = true;
  }

  handleBlurInput() {
    this.isInputFocus = false;
  }

  changeAnimation(animationType) {
    this.animation = animationType;
  }

  changeIconsType(iconsType) {
    this.iconsType = iconsType;
    this.icons = [];

    this.updateQueryParams({ type: iconsType });
  }

  updateQueryParams(queryParams) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge',
        queryParams,
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

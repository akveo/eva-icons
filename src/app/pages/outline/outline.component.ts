import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, delay, map, mergeMap, takeWhile, tap } from 'rxjs/operators';

import { IconService } from '../../@core/data/icon.service';

@Component({
  selector: 'eva-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.scss'],
})
export class OutlineComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  icons: string[] = [];
  view: string = 'full';

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private iconService: IconService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
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
            this.iconService.getFilteredIconsData(searchKeyValue) :
            this.iconService.getIconsData();
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
            ['/outline'],
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

  ngOnDestroy() {
    this.alive = false;
  }
}

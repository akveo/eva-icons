import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IconService } from '../../@core/data/icon.service';
import { debounceTime, mergeMap, takeWhile } from 'rxjs/operators';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'eva-outline',
  templateUrl: './outline.component.html',
  styleUrls: ['./outline.component.scss'],
})
export class OutlineComponent implements AfterViewInit, OnDestroy {

  private alive = true;

  icons: string[];
  view: string = 'full';

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private iconService: IconService) {
    this.iconService.getIconsData()
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((iconsData) => {
        this.icons = iconsData;
      });
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        takeWhile(() => this.alive),
        mergeMap((event: any) => this.iconService.getFilteredIconsData(event.target.value)),
      )
      .subscribe((iconsData) => {
        this.icons = iconsData;
      });
  }

  changeView(viewMode) {
    this.view = viewMode;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}

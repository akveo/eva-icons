import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'eva-download-icon',
  styleUrls: ['./download-icon.component.scss'],
  templateUrl: './download-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadIconComponent implements AfterViewInit {

  private defaultControlData = [
    {
      format: 'svg',
      title: 'SVG',
      href: 'package-build/type/svg/name.svg',
    },
    {
      format: 'png',
      title: 'PNG',
      href: 'package-build/type/png/64/name.png',
    },
  ];

  @Input() selectedIcon: string = '';
  @Input() iconType: string = '';

  matches = {
    type: '',
    name: '',
  };
  selectedFormat: string;
  downloadControls: { format: string; title: string }[] = [ ];

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.matches = {
      type: this.iconType,
      name: this.selectedIcon,
    };
    this.downloadControls = this.defaultControlData.map((item) => {
      return {
        ...item,
        href: this.getIconHref(item.href),
      };
    });

    this.changeDetectorRef.detectChanges();
  }

  getIconHref(href: string): string {
    return href.replace(/type|name/gi, (matched) => {
      return this.matches[matched];
    });
  }

  selectFormatAndDownloadIcon(iconFormat: string) {
    this.selectedFormat = iconFormat;
  }
}

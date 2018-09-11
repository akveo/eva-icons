import { Component, Input } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ApiService } from '../../../../@core/data/api.service';

@Component({
  selector: 'eva-download-icon',
  styleUrls: ['./download-icon.component.scss'],
  templateUrl: './download-icon.component.html',
})
export class DownloadIconComponent {

  @Input() selectedIcon: string;

  selectedFormat: string;
  selectedPngSize: number;
  downloadControls: { format: string; title: string }[] = [
    {
      format: 'svg',
      title: 'SVG',
    },
    {
      format: 'png',
      title: 'PNG',
    },
    {
      format: 'sketch',
      title: 'Sketch',
    },
    {
      format: 'fig',
      title: 'FIG',
    },
  ];
  availablePngSizes: number[] = [16, 24, 32, 64, 128, 256, 512];
  isDownloadPng = false;

  constructor(private apiService: ApiService) {
  }

  selectFormatAndDownloadIcon(iconFormat: string) {
    this.selectedFormat = iconFormat;
    this.isDownloadPng = iconFormat === 'png';

    if (this.isDownloadPng) {
      return;
    }

    this.downloadIcon({
      icon: this.selectedIcon,
      format: this.selectedFormat,
    });
  }

  selectPngSizeAndDownloadIcon(pngSize: number) {
    this.selectedPngSize = pngSize;

    this.downloadIcon({
      icon: this.selectedIcon,
      format: this.selectedFormat,
      size: this.selectedPngSize,
    });
  }

  downloadIcon(option: {
    icon: string;
    format: string;
    size?: number,
  }) {
    const { icon, format, size } = option;

    let params = new HttpParams();
    params = params.append('icon', icon);
    params = params.append('format', format);

    if (size) {
      params = params.append('size', size.toString());
    }

    this.apiService.download('/download/icon', {params});
  }
}

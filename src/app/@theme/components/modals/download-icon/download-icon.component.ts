import { Component } from '@angular/core';

@Component({
  selector: 'eva-download-icon',
  styleUrls: ['./download-icon.component.scss'],
  templateUrl: './download-icon.component.html',
})
export class DownloadIconComponent {

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

  selectFormatAndDownloadIcon(iconFormat: string) {
    this.selectedFormat = iconFormat;
    this.isDownloadPng = iconFormat === 'png';

    if (this.isDownloadPng) {
      return;
    }

    this.downloadIcon('download icon');
  }

  selectPngSizeAndDownloadIcon(pngSize: number) {
    this.selectedPngSize = pngSize;

    this.downloadIcon('download png icon');
  }

  downloadIcon(option: string) {
  }
}

import { Component, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

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

  constructor(private http: HttpClient) {
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
      const sizeParam = size.toString();
      params = params.append('size', sizeParam);
    }

    this.http.get(
      '/api/download/icon', {
        params,
        responseType: 'blob',
        observe: 'response',
      })
      .subscribe((response) => {
        const header = response.headers.get('Content-Disposition');
        const filename = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(header)[1];

        saveAs(response.body, filename);
      });
  }
}

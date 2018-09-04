import { Component } from '@angular/core';
// todo: uncomment when api will be implemented
import { HttpClient } from '@angular/common/http';
import { NbModalRef } from '@nebular/theme';
import { saveAs } from 'file-saver';

class IconsFormat {
  png?: boolean;
  svg?: boolean;
  sketch?: boolean;
  fig?: boolean;
}

class IconsSize {
  png?: number | string;
}

// todo: uncomment when api will be implemented
/*class Icon {
  id: string;
  size?: number | string | null;
}*/

@Component({
  selector: 'eva-download-icons',
  styleUrls: ['./download-icons.component.scss'],
  templateUrl: './download-icons.component.html',
})
export class DownloadIconsComponent {

  readonly png = 'png';
  readonly svg = 'svg';
  readonly sketch = 'sketch';
  readonly fig = 'fig';

  private defaultIconsSizes = {
    png: '64',
  };

  constructor(protected modalRef: NbModalRef<DownloadIconsComponent>,
              private http: HttpClient) {

  }

  selectedSizes: IconsSize = {
    png: this.defaultIconsSizes[this.png],
  };
  selectedFormats: IconsFormat = {
    png: false,
    svg: false,
    sketch: false,
    fig: false,
  };
  availablePngSizes: string[] = ['16', '24', '32', '64', '128', '256', '512', 'All'];
  isDownloadPng = false;

  selectIconsFormat(iconsFormat: string) {
    this.selectedFormats[iconsFormat] = !this.selectedFormats[iconsFormat];
    this.isDownloadPng = this.selectedFormats[this.png];

    if (this.selectedSizes[iconsFormat] && !this.selectedFormats[iconsFormat]) {
      this.selectedSizes[iconsFormat] = this.defaultIconsSizes[iconsFormat];
    }
  }

  selectIconsSize(event, iconsFormat: string, size: number | string) {
    event.stopPropagation();

    this.selectedSizes[iconsFormat] = size;
  }

  preventEvent(event) {
    event.preventDefault();
  }

  downloadIcons() {
    this.modalRef.hide();

    // todo: uncomment when api will be implemented
    this.http.get(
      '/api/download/icons', {
        observe: 'response',
        responseType: 'blob',
      })
      .subscribe((response) => {
        const header = response.headers.get('Content-Disposition');
        const filename = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(header)[1];

        saveAs(response.body, filename);
      });
  }
}

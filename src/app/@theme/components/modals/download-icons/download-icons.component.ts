import { Component } from '@angular/core';
// todo: uncomment when api will be implemented
// import { HttpClient } from '@angular/common/http';

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

  /*constructor(private http: HttpClient) {}*/

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
    // todo: uncomment when api will be implemented
/*    this.http.get(
      '/api',
      {
        responseType: 'text',
      })
      .subscribe((response) => {
      });*/
/*    const icons: Icon[] = Object.keys(this.selectedFormats)
      .reduce((result, iconFormat) => {
        if (this.selectedFormats[iconFormat]) {
          const icon: Icon = {
            id: iconFormat,
            size: this.selectedSizes[iconFormat] ? this.selectedSizes[iconFormat] : null,
          };

          return result.concat(icon);
        }

        return result;
      }, []);*/
  }
}

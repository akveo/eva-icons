import { Inject, Injectable } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';

@Injectable()
export class StickyElementService {

  private stickyElement: HTMLElement;
  private container: HTMLElement;

  constructor(@Inject(NB_WINDOW) private window) {
  }

  setDomElementsAndInit(stickyElement, container) {
    this.stickyElement = stickyElement;
    this.container = container;

    this.initSticky();
  }

  initSticky() {
    this.makeAsSticky();
  }

  makeAsSticky() {
    if (!this.stickyElement) {
      return;
    }

    const containerRect = this.container.getBoundingClientRect();
    const windowInnerHeight = this.window.innerHeight;
    const props = {
      top: '0px',
    };

    if (containerRect.bottom > windowInnerHeight) {
      props.top = `${windowInnerHeight - 90}px`;

      this.stickyElementSetStyle(props);
    } else if (containerRect.bottom <= this.window.innerHeight + 100) {
      props.top = `${containerRect.height - 90}px`;

      this.stickyElementSetStyle(props);
    }
  }

  stickyElementSetStyle(props) {
    const { top } = props;

      this.stickyElement.style.position = 'absolute';
      this.stickyElement.style.top = `${top}`;
  }
}

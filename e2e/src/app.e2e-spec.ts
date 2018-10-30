/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('App common behavior', () => {
  beforeEach((done) => {
    browser.get('').then(() => done());
  });

  it('should be active outline', () => {
    element(by.css('eva-type-switcher .nav-item.active span')).getText().then(value => {
      expect(value).toEqual('Outline');
    });
  });

  it('should contain list of icons', () => {
    element.all(by.css('eva-icon-list nb-card')).count()
      .then((count) => {
        expect(count).toBeGreaterThan(10);
      });
  });

  it('should search "brush" icon', () => {
    element(by.css('.search-input')).sendKeys('brush')
      .then(() => {
        return browser.wait(() => {
          return element
            .all(by.css('eva-icon-list nb-card:not(.fake-card)'))
            .count()
            .then((count) => {
              return count === 1;
            });
        }, 100);
      });
  });

  it('should open download icon popup', () => {
    element(by.css('eva-icon-list nb-card:nth-of-type(1)'))
      .click()
      .then(() => {
        const downloadIconPopup = element(by.css('eva-download-icon')).isDisplayed();

        expect(downloadIconPopup).toBeTruthy();
      });
  });
});

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
    element(by.css('eva-header .menu-item .active span')).getText().then(value => {
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

  it('should switch to icon view', () => {
    const cssSelector = 'eva-icon-list nb-card:nth-of-type(1) nb-card-body .icon-class';
    const fullCard = element(by.css(cssSelector));

    expect(fullCard.isDisplayed()).toBeTruthy();

    const iconViewButton = element(by.css('.switch-button.icon-view'));

    iconViewButton.click()
      .then(() => {
        const iconCard = element(by.css(cssSelector));

        expect(iconCard.isPresent()).toBeFalsy();
      });
  });
});

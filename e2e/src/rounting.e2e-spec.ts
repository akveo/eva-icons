/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('Routing', () => {
  it('should open outline page', (done) => {
    browser.get('#/?type=outline')
      .then(() => {
        element(by.css('eva-type-switcher .nav-item.active span'))
          .getText()
          .then(value => {
            expect(value).toEqual('Outline');

            done();
          });
      });
  });

  it('should open fill page', (done) => {
    browser.get('#/?type=fill')
      .then(() => {
        element(by.css('eva-type-switcher .nav-item.active span'))
          .getText()
          .then(value => {
            expect(value).toEqual('Fill');

            done();
          });
      });
  });

  it('should open fill page with github icon', (done) => {
    browser.get('#/?type=fill&searchKey=github')
      .then(() => {
        element
          .all(by.css('eva-icon-list nb-card:not(.fake-card)'))
          .count()
          .then(value => {
            expect(value).toEqual(1);

            done();
          });
      });
  });
});

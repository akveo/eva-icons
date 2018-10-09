/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('Routing', () => {
  it('should open outline page', (done) => {
    browser.get('#/outline')
      .then(() => {
        element(by.css('eva-header .menu-item .active span'))
          .getText()
          .then(value => {
            expect(value).toEqual('Outline');

            done();
          });
      });
  });

  it('should open fill page', (done) => {
    browser.get('#/fill')
      .then(() => {
        element(by.css('eva-header .menu-item .active span'))
          .getText()
          .then(value => {
            expect(value).toEqual('Fill');

            done();
          });
      });
  });
});

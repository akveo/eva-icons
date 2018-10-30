/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import Icon from './icon';
import icons from '../../package-build/eva-icons.json';

export default Object.keys(icons)
  .map(key => new Icon(key, icons[key]))
  .reduce((object, icon) => {
    object[icon.name] = icon;

    return object;
  }, {});
